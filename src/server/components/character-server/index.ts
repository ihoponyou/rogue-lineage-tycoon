import { Component, Components } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { setInterval } from "@rbxts/set-timeout";
import { AbstractCharacter } from "shared/components/abstract-character";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { WeaponType } from "shared/configs/weapons";
import { ANIMATIONS } from "shared/constants";
import { AnimationManager } from "shared/modules/animation-manager";
import { cframeFromOrientationDeg } from "shared/modules/cframe-util";
import { Equippable } from "shared/modules/equippable";
import { ItemServer } from "../item-server";
import { SkillServer } from "../skill-server";
import { Weapon } from "../weapon";
import { RagdollServer } from "./ragdoll-server";

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const KNOCK_PERCENT_THRESHOLD = 0.15;
const CARRY_ATTACHMENT_CFRAME = new CFrame(1.5, 1.5, 0).mul(
	cframeFromOrientationDeg(-90, -180, 0),
);

type ParticleAttachment = Attachment & {
	Critted: Sound;
	Sniped: Sound;
	Crit: ParticleEmitter;
};

@Component({
	tag: "Character",
	defaults: {
		isKnocked: false,
		isAlive: true,
		isStunned: false,
		isBlocking: false,
		isAttacking: false,
		combo: 0,
		lightAttackDebounce: false,
		heavyAttackDebounce: false,
	},
})
export class CharacterServer extends AbstractCharacter implements OnTick {
	protected inventoryFolder = this.newFolder("Inventory");
	protected skillsFolder = this.newFolder("Skills");

	private headCollision = new Instance("NoCollisionConstraint");
	private torsoCollision = new Instance("NoCollisionConstraint");

	private currentlyEquipped?: Equippable;
	private animationManager!: AnimationManager;
	private weapons: Record<WeaponType, Weapon | undefined> = {
		[WeaponType.Fists]: undefined,
		[WeaponType.Dagger]: undefined,
		[WeaponType.Spear]: undefined,
		[WeaponType.Sword]: undefined,
	};

	private hiltJoint = this.newHiltJoint();
	private hiltBone = this.newHiltBone();
	private alignOrientation = this.newAlignOrientation();
	private alignPosition = this.newAlignPosition();
	private carryAttachment = this.newCarryAttachment();

	constructor(
		protected components: Components,
		protected ragdoll: RagdollServer,
	) {
		super();

		this.animationManager = new AnimationManager(this.getAnimator());
	}

	override onStart(): void {
		super.onStart();

		this.inventoryFolder.Parent = this.instance;
		this.skillsFolder.Parent = this.instance;

		const head = this.getHead();
		this.headCollision.Parent = head;
		this.headCollision.Part0 = head;

		const torso = this.getTorso();
		this.torsoCollision.Parent = torso;
		this.torsoCollision.Part0 = torso;

		const humanoidRootPart = this.getHumanoidRootPart();
		this.carryAttachment.Parent = humanoidRootPart;
		this.alignOrientation.Parent = humanoidRootPart;
		this.alignOrientation.Attachment0 = humanoidRootPart.RootAttachment;
		this.alignPosition.Parent = humanoidRootPart;
		this.alignPosition.Attachment0 = humanoidRootPart.RootAttachment;

		this.instance.AddTag("Carriable");
		this.instance.AddTag("FallDamage");
		this.instance.AddTag("CombatManager");

		this.loadAnimations(ANIMATIONS);

		this.trove.connect(this.humanoid.HealthChanged, (health) =>
			this.onHealthChanged(health),
		);
	}

	onTick(dt: number): void {
		if (!this.attributes.isAlive) return;

		const humanoid = this.humanoid;
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	breakJoints(): void {
		this.instance.GetDescendants().forEach((value) => {
			if (
				value.IsA("BallSocketConstraint") ||
				value.IsA("JointInstance")
			) {
				value.Destroy();
			}
		});
	}

	kill(): void {
		if (!this.attributes.isAlive) return;
		this.attributes.isAlive = false;

		this.humanoid.Health = 0;
		this.breakJoints();
	}

	snipe(): void {
		// TODO: make thsi not a hack
		const particleAttachment = this.getHead().FindFirstChild(
			"ParticleAttachment",
		) as ParticleAttachment;
		if (particleAttachment === undefined) return;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);

		this.kill();
	}

	giveForceField(): void {
		const ffTrove = this.trove.extend();
		const startPos = this.getHumanoidRootPart().Position;
		const startTick = tick();
		const ff = ffTrove.add(new Instance("ForceField"));
		ff.Parent = this.instance;

		ffTrove.add(
			setInterval(() => {
				const timeExpired = tick() - startTick > FF_DURATION;

				const currentPos = this.getHumanoidRootPart().Position;
				const distanceFromStart = currentPos.sub(startPos).Magnitude;
				const leftSpawn = distanceFromStart > PROTECTED_DISTANCE;

				if (timeExpired || leftSpawn) ffTrove.destroy();
			}, 0.5),
		);
	}

	takeDamage(amount: number): void {
		this.humanoid.TakeDamage(math.min(this.humanoid.Health, amount));
	}

	isBehind(character: CharacterServer): boolean {
		const position = this.instance.GetPivot().Position;
		const theirCFrame = character.instance.GetPivot();
		const toThem = theirCFrame.Position.sub(position);
		const dot = theirCFrame.LookVector.Dot(toThem.Unit);
		return dot > 0;
	}

	hasItem(itemName: string): boolean {
		return this.getItem(itemName) !== undefined;
	}

	getItem(itemName: string): ItemServer | undefined {
		const instance = this.inventoryFolder.FindFirstChild(itemName);
		if (instance === undefined) return undefined;
		const item = this.components.getComponent<ItemServer>(instance);
		return item;
	}

	getHiltBone(): Part {
		return this.hiltBone;
	}

	getWeaponOfType(weaponType: WeaponType): Weapon | undefined {
		return this.weapons[weaponType];
	}

	learnSkill(id: SkillId): void {
		SkillServer.instantiate(id, this.skillsFolder, this);
	}

	giveItem(id: ItemId, quantity: number = 1): void {
		ItemServer.instantiate(
			id,
			quantity,
			this.inventoryFolder,
			this,
		).andThen((item) => {
			// holster
			item.unequip(this);

			if (!item.instance.HasTag(Weapon.TAG)) return;
			this.components
				.waitForComponent<Weapon>(item.instance)
				.andThen((weapon) => this.cacheWeapon(weapon));
		});
	}

	getCurrentEquipped(): Equippable | undefined {
		return this.currentlyEquipped;
	}

	setCurrentEquipped(equippable?: Equippable): void {
		this.currentlyEquipped = equippable;
	}

	loadAnimations(animationFolder: Folder) {
		const anims = animationFolder
			.GetDescendants()
			.filter((value) => value.IsA("Animation"));
		this.animationManager.loadAnimations(anims as Animation[]);
	}

	playAnimation(name: string, speed?: number) {
		this.animationManager.playTrack(name, undefined, undefined, speed);
	}

	stopAnimation(name: string, fadeTime?: number) {
		this.animationManager.stopTrack(name, fadeTime);
	}

	connectToAnimationMarker(
		trackName: string,
		markerName: string,
		callback: (param?: string) => void,
	) {
		return this.animationManager.connectToTrackMarker(
			trackName,
			markerName,
			callback,
		);
	}

	connectToAnimationStopped(name: string, callback: () => void) {
		return this.animationManager.getTrack(name)?.Stopped.Connect(callback);
	}

	toggleRagdoll(on: boolean): void {
		this.ragdoll.toggle(on);
	}

	setAlignOrientationAtt1(attachment?: Attachment): void {
		this.alignOrientation.Attachment1 = attachment;
	}

	setAlignPositionAtt1(attachment?: Attachment): void {
		this.alignPosition.Attachment1 = attachment;
	}

	getCarryAttachment(): Attachment {
		return this.carryAttachment;
	}

	setHeadCollisionPart1(part?: BasePart): void {
		this.headCollision.Part1 = part;
	}

	setTorsoCollisionPart1(part?: BasePart): void {
		this.torsoCollision.Part1 = part;
	}

	protected onHealthChanged(health: number): void {
		const percentHealth = health / this.humanoid.MaxHealth;
		if (this.attributes.isKnocked) {
			if (percentHealth > KNOCK_PERCENT_THRESHOLD) {
				if (this.instance.GetAttribute("isCarried") === true) return;
				this.attributes.isKnocked = false;
				this.ragdoll.toggle(false);
			}
			return;
		}

		if (health > 0) return;
		this.knock();
	}

	private newAlignOrientation(): AlignOrientation {
		const constraint = new Instance("AlignOrientation");
		constraint.RigidityEnabled = true;
		return constraint;
	}

	private newAlignPosition(): AlignPosition {
		const constraint = new Instance("AlignPosition");
		constraint.ApplyAtCenterOfMass = true;
		constraint.RigidityEnabled = true;
		return constraint;
	}

	private newCarryAttachment(): Attachment {
		const attachment = new Instance("Attachment");
		attachment.CFrame = CARRY_ATTACHMENT_CFRAME;
		return attachment;
	}

	// what if the character drops the highest tier weapon
	private cacheWeapon(weapon: Weapon) {
		const weaponType = weapon.config.type;
		const currentWeaponOfType = this.weapons[weaponType];
		if (
			currentWeaponOfType === undefined ||
			currentWeaponOfType.config.equipPriority <
				weapon.config.equipPriority
		) {
			this.weapons[weaponType] = weapon;
		}
	}

	private newHiltJoint(): Motor6D {
		const joint = new Instance("Motor6D");
		joint.Name = "HiltJoint";
		joint.C0 = new CFrame(0, -1, 0);
		return joint;
	}

	private newHiltBone(): Part {
		const bone = new Instance("Part");
		bone.Name = "Hilt";
		bone.CanCollide = false;
		bone.CanTouch = false;
		bone.CanQuery = false;
		bone.Massless = true;
		bone.Transparency = 1;
		return bone;
	}

	private newFolder(name: string): Folder {
		const inventory = new Instance("Folder");
		inventory.Name = name;
		return inventory;
	}
}
