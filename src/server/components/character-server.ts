import { Component, Components } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { setInterval } from "@rbxts/set-timeout";
import Signal from "@rbxts/signal";
import { Trove } from "@rbxts/trove";
import { AbstractCharacter } from "shared/components/abstract-character";
import { UsefulModel } from "shared/components/useful-model";
import { BASE_CLIMB_SPEED, BASE_WALK_SPEED } from "shared/configs";
import { isItemId, ItemId } from "shared/configs/items";
import { ActiveSkillId, isActiveSkillId } from "shared/configs/skills";
import { WeaponType } from "shared/configs/weapons";
import { ANIMATIONS } from "shared/constants";
import { AnimationManager } from "shared/modules/animation-manager";
import { cframeFromOrientationDeg } from "shared/modules/cframe-util";
import { Equippable } from "shared/modules/equippable";
import { Stat, StatModifierType } from "shared/modules/stat";
import { ItemServer } from "./item-server";
import { RagdollServer } from "./ragdoll-server";
import { ActiveSkillServer } from "./skill-server";
import { Weapon } from "./weapon";

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
		isBlocking: false,
		isAttacking: false,
		isCarried: false,
		isDashing: false,
		combo: 0,
		lightAttackDebounce: false,
		heavyAttackDebounce: false,
		stunTimer: 0,
	},
})
export class CharacterServer extends AbstractCharacter implements OnTick {
	readonly walkSpeed = new Stat(BASE_WALK_SPEED);
	readonly climbSpeed = new Stat(BASE_CLIMB_SPEED);
	readonly attackSpeed = new Stat(1);

	protected inventoryFolder = this.newFolder("Inventory");
	protected skillsFolder = this.newFolder("Skills");

	private hiltJoint = this.newHiltJoint();
	private hiltBone = this.newHiltBone();
	private alignOrientation = this.newAlignOrientation();
	private alignPosition = this.newAlignPosition();
	private carryAttachment = this.newCarryAttachment();

	private headCollision = new Instance("NoCollisionConstraint");
	private torsoCollision = new Instance("NoCollisionConstraint");
	private killed = new Signal();
	private trove = new Trove();

	private currentlyEquipped?: Equippable;
	private animationManager!: AnimationManager;
	private weapons: Record<WeaponType, Weapon | undefined> = {
		[WeaponType.Fists]: undefined,
		[WeaponType.Dagger]: undefined,
		[WeaponType.Spear]: undefined,
		[WeaponType.Sword]: undefined,
	};
	private noJumpThread?: thread;

	constructor(
		usefulModel: UsefulModel,
		protected components: Components,
		readonly ragdoll: RagdollServer,
	) {
		super(usefulModel);
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	override onStart(): void {
		super.onStart();

		this.animationManager = new AnimationManager(this.getAnimator());

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

		const rightArm = this.instance.WaitForChild("Right Arm") as BasePart;

		this.hiltBone.Parent = this.instance;
		this.hiltJoint.Parent = this.hiltBone;
		this.hiltJoint.Part0 = rightArm;
		this.hiltJoint.Part1 = this.hiltBone;

		this.instance.AddTag("Carriable");
		this.instance.AddTag("FallDamage");

		this.loadAnimations(ANIMATIONS);

		this.onHealthChanged((newHealth) => this._onHealthChanged(newHealth));
		this.walkSpeed.onModifiersChanged(() => {
			this.getHumanoid().WalkSpeed = this.walkSpeed.getCalculatedValue();
		});

		this.takeDamage(90);
	}

	onTick(dt: number): void {
		if (this.attributes.stunTimer > 0) {
			this.attributes.stunTimer -= dt;
		} else if (this.attributes.stunTimer < 0) {
			this.attributes.stunTimer = 0;
		}
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

		this.killed.Fire();
	}

	onKilled(callback: () => void): RBXScriptConnection {
		return this.killed.Connect(callback);
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

	learnSkill(id: ActiveSkillId): void {
		if (!isActiveSkillId(id)) error(`"${id}" is not a valid ActiveSkillId`);
		ActiveSkillServer.instantiate(id, this.skillsFolder, this);
	}

	giveItem(id: ItemId, quantity: number = 1): void {
		if (!isItemId(id)) error(`"${id}" is not a valid ItemId`);
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

	onHealthChanged(
		callback: (newHealth: number) => void,
	): RBXScriptConnection {
		return this.trove.connect(this.humanoid.HealthChanged, callback);
	}

	stun(duration: number): () => void {
		if (duration <= 0) {
			error(`stun duration must be positive`);
		}
		const removeModifier = this.walkSpeed.addTemporaryModifier(
			"stun",
			StatModifierType.Multiplier,
			0,
			duration,
		);
		return () => {
			removeModifier();
		};
	}

	attack(
		animationName: string,
		onSwing: Callback,
		onContact: Callback,
		onStopped: Callback,
		noJumpDuration: number,
		endlagDuration: number,
	): void {
		this.attributes.isAttacking = true;

		if (noJumpDuration > 0) {
			this.toggleJump(false);
		}

		const swingConn = this.connectToAnimationMarker(
			animationName,
			"swing",
			onSwing,
		);
		const contactConn = this.connectToAnimationMarker(
			animationName,
			"contact",
			onContact,
		);

		const attackSpeed = this.attackSpeed.getCalculatedValue();
		const stoppedConn = this.connectToAnimationStopped(
			animationName,
			() => {
				swingConn?.Disconnect();
				contactConn?.Disconnect();
				stoppedConn?.Disconnect();

				this.attributes.isAttacking = false;

				if (noJumpDuration > 0) {
					if (this.noJumpThread !== undefined) {
						task.cancel(this.noJumpThread);
					}
					this.noJumpThread = this.trove.add(
						task.delay(noJumpDuration / attackSpeed, () =>
							this.toggleJump(true),
						),
					);
				}

				if (endlagDuration > 0) {
					this.attributes.stunTimer = endlagDuration / attackSpeed;

					// call this if attack gets cancelled
					const removeModifier = this.walkSpeed.addTemporaryModifier(
						"endlag",
						endlagDuration / attackSpeed,
						0,
						StatModifierType.Multiplier,
					);
				}

				onStopped();
			},
		);
		this.playAnimation(animationName, attackSpeed);
	}

	canBeCarried(): boolean {
		return !(
			!this.attributes.isAlive ||
			!this.attributes.isKnocked ||
			this.attributes.isCarried
		);
	}

	canCarry(): boolean {
		return !(
			!this.attributes.isAlive ||
			this.attributes.isBlocking ||
			this.attributes.isCarried ||
			this.attributes.isKnocked
		);
	}

	private _onHealthChanged(health: number): void {
		const percentHealth = health / this.humanoid.MaxHealth;
		if (this.attributes.isKnocked) {
			if (
				!this.attributes.isCarried &&
				percentHealth > KNOCK_PERCENT_THRESHOLD
			) {
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
