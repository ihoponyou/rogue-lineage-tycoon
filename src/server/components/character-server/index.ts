import { Component, Components } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Events } from "server/network";
import { DataService } from "server/services/data-service";
import { store } from "server/store";
import {
	selectPlayer,
	selectPlayerConditions,
	selectPlayerHealth,
	selectPlayerTransform,
} from "server/store/selectors";
import { AbstractCharacter } from "shared/components/abstract-character";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { WeaponType } from "shared/configs/weapons";
import { ANIMATIONS } from "shared/constants";
import { AnimationManager } from "shared/modules/animation-manager";
import { Equippable } from "shared/modules/equippable";
import {
	deserializeVector3,
	serializeVector3,
} from "shared/modules/serialized-vector3";
import { ItemServer } from "../item-server";
import { PlayerServer } from "../player-server";
import { SkillServer } from "../skill-server";
import { Weapon } from "../weapon";
import { RagdollServer } from "./ragdoll-server";

const FF_DURATION = 15;
const PROTECTED_DISTANCE = 5;
const BASE_REGEN_RATE = 0.5;
const MINIMUM_TEMPERATURE = 0;
const MAXIMUM_TEMPERATURE = 100;
const KNOCK_PERCENT_THRESHOLD = 0.15;

const EVENTS = Events.character;

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

	private animationManager!: AnimationManager;

	private hiltJoint = this.newHiltJoint();
	private hiltBone = this.newHiltBone();
	private weapons: Record<WeaponType, Weapon | undefined> = {
		[WeaponType.Fists]: undefined,
		[WeaponType.Dagger]: undefined,
		[WeaponType.Spear]: undefined,
		[WeaponType.Sword]: undefined,
	};

	private currentlyEquipped?: Equippable;

	public constructor(
		protected ragdoll: RagdollServer,
		private components: Components,
		private dataService: DataService,
	) {
		super();

		const character = promiseR6(this.instance).expect();
		this.animationManager = new AnimationManager(
			character.Humanoid.Animator,
		);
	}

	public override onStart(): void {
		super.onStart();

		this.inventoryFolder.Parent = this.instance;
		this.skillsFolder.Parent = this.instance;

		this.instance.AddTag("FallDamage");
		this.instance.AddTag("CombatManager");

		this.loadAnimations(ANIMATIONS);

		const player = this.getPlayer();
		this.trove.add(
			this.dataService.connectToPreRelease(player, (profile) => {
				const pivot = this.instance.GetPivot();
				const yRotation = pivot.ToEulerAnglesXYZ()[1];
				profile.Data.transform.position = serializeVector3(
					pivot.Position,
				);
				profile.Data.transform.yRotation = yRotation;
			}),
		);

		this.trove.connect(this.humanoid.HealthChanged, (health) =>
			this.onHealthChanged(health),
		);

		const character = promiseR6(this.instance).expect();
		this.trove.connect(
			character.HumanoidRootPart.AncestryChanged,
			(_, parent) => {
				if (parent !== undefined) return;
				this.components
					.waitForComponent<PlayerServer>(this.getPlayer())
					.expect()
					.loadCharacter();
			},
		);
	}

	public onTick(dt: number): void {
		if (!this.attributes.isAlive) return;

		const player = this.getPlayer();

		store.decayStomach(player, dt);
		store.decayToxicity(player, dt);

		const humanoid = this.humanoid;
		if (humanoid.Health >= humanoid.MaxHealth) return;

		const boost = 0; // TODO: health regen multiplier
		const regenRate = BASE_REGEN_RATE * (1 + boost);
		humanoid.TakeDamage(dt * -regenRate);
	}

	public loadHealth(): void {
		let savedHealth = store.getState(selectPlayerHealth(this.getPlayer()));
		if (savedHealth === undefined) error("health not found");
		if (savedHealth < 1) savedHealth = 100;
		this.humanoid.Health = savedHealth;
	}

	public loadConditions(): void {
		const conditions = store.getState(
			selectPlayerConditions(this.getPlayer()),
		);
		if (conditions === undefined) error("conditions not found");
		for (const condition of conditions) {
			this.instance.AddTag(condition);
		}
	}

	public loadTransform(): void {
		const savedTransform = store.getState(
			selectPlayerTransform(this.getPlayer()),
		);
		if (savedTransform === undefined) error("transform not found");
		this.instance.PivotTo(
			new CFrame(deserializeVector3(savedTransform.position)).mul(
				CFrame.fromOrientation(0, savedTransform.yRotation, 0),
			),
		);
	}

	public knock(): void {
		if (this.attributes.isKnocked) return;
		this.attributes.isKnocked = true;
		this.ragdoll.toggle(true);
	}

	public breakJoints(): void {
		this.instance.GetDescendants().forEach((value) => {
			if (
				value.IsA("BallSocketConstraint") ||
				value.IsA("JointInstance")
			) {
				value.Destroy();
			}
		});
	}

	public kill(): void {
		if (!this.attributes.isAlive) return;
		this.attributes.isAlive = false;

		this.humanoid.Health = 0;
		this.breakJoints();

		const player = this.getPlayer();

		store.subtractLife(player);

		EVENTS.killed.fire(player);

		this.components
			.waitForComponent<PlayerServer>(this.getPlayer())
			.andThen((playerServer) => {
				task.wait(Players.RespawnTime);
				playerServer.loadCharacter().catch(warn);
			});
	}

	public snipe(): void {
		const particleAttachment = this.getHead().ParticleAttachment;
		if (!particleAttachment) return;

		particleAttachment.Critted.Play();
		particleAttachment.Sniped.Play();
		particleAttachment.Crit.Emit(1);

		this.kill();
	}

	public giveForceField(): void {
		const ffTrove = this.trove.extend();
		const startPos = (this.instance as StarterCharacter).HumanoidRootPart
			.Position;
		const startTick = tick();
		const ff = ffTrove.add(new Instance("ForceField"));
		ff.Parent = this.instance;

		ffTrove.add(
			setInterval(() => {
				const timeExpired = tick() - startTick > FF_DURATION;

				const currentPos = (this.instance as StarterCharacter)
					.HumanoidRootPart.Position;
				const distanceFromStart = currentPos.sub(startPos).Magnitude;
				const leftSpawn = distanceFromStart > PROTECTED_DISTANCE;

				if (timeExpired || leftSpawn) ffTrove.destroy();
			}, 0.5),
		);
	}

	public adjustTemperature(amount: number) {
		const player = this.getPlayer();
		const temperature = store.getState(selectPlayer(player))?.resources
			.temperature;
		if (temperature === undefined) error("no data");

		const newTemperature = math.clamp(
			temperature + amount,
			MINIMUM_TEMPERATURE,
			MAXIMUM_TEMPERATURE,
		);
		store.setTemperature(player, newTemperature);

		if (newTemperature === MINIMUM_TEMPERATURE)
			this.instance.AddTag("Frostbite");
		else if (newTemperature === MAXIMUM_TEMPERATURE)
			this.instance.AddTag("BurnScar");
	}

	public takeDamage(amount: number): void {
		this.humanoid.TakeDamage(math.min(this.humanoid.Health, amount));
	}

	public isBehind(character: CharacterServer): boolean {
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

	public loadAnimations(animationFolder: Folder) {
		const anims = animationFolder
			.GetDescendants()
			.filter((value) => value.IsA("Animation"));
		this.animationManager.loadAnimations(anims as Animation[]);
	}

	public playAnimation(name: string, speed?: number) {
		this.animationManager.playTrack(name, undefined, undefined, speed);
	}

	public stopAnimation(name: string, fadeTime?: number) {
		this.animationManager.stopTrack(name, fadeTime);
	}

	public connectToAnimationMarker(
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

	public connectToAnimationStopped(name: string, callback: () => void) {
		return this.animationManager.getTrack(name)?.Stopped.Connect(callback);
	}

	public toggleRagdoll(on: boolean): void {
		this.ragdoll.toggle(on);
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

	private onHealthChanged(health: number): void {
		store.setHealth(this.getPlayer(), health);
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
}
