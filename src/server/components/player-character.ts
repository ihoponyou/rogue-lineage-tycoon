import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import {
	MAXIMUM_TEMPERATURE,
	MINIMUM_TEMPERATURE,
} from "server/configs/constants";
import { AttackData } from "server/modules/attack-data";
import { Events } from "server/network";
import { DataService } from "server/services/data-service";
import { HitService } from "server/services/hit-service";
import { store } from "server/store";
import {
	selectPlayer,
	selectPlayerConditions,
	selectPlayerHealth,
	selectPlayerInventory,
	selectPlayerSkills,
	selectPlayerTransform,
} from "server/store/selectors";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import {
	deserializeVector3,
	serializeVector3,
} from "shared/modules/serialized-vector3";
import { CharacterServer } from "./character-server";
import { PlayerServer } from "./player-server";
import { Weapon } from "./weapon";

const COMBO_RESET_DELAY = 2;
const HEAVY_ATTACK_COOLDOWN = 3;
const FISTS_CONFIG = getWeaponConfig("Fists");

@Component({
	tag: CharacterServer.TAG,
	predicate: (instance) => {
		return Players.GetPlayerFromCharacter(instance) !== undefined;
	},
})
export class PlayerCharacter
	extends BaseComponent<{}, Model>
	implements OnStart, OnTick
{
	static readonly TAG = CharacterServer.TAG;

	private player!: PlayerServer;

	private trove = new Trove();

	private comboResetThread?: thread;

	constructor(
		private components: Components,
		private character: CharacterServer,
		private dataService: DataService,
		private hitService: HitService,
	) {
		super();
	}

	onStart(): void {
		this.player = this.components
			.waitForComponent<PlayerServer>(
				Players.GetPlayerFromCharacter(this.instance)!,
			)
			.expect();

		this.trove.add(
			this.dataService.connectToPreRelease(
				this.player.instance,
				(profile) => {
					const pivot = this.instance.GetPivot();
					const yRotation = pivot.ToEulerAnglesXYZ()[1];
					profile.Data.transform.position = serializeVector3(
						pivot.Position,
					);
					profile.Data.transform.yRotation = yRotation;
				},
			),
		);

		const character = promiseR6(this.instance).expect();
		this.trove.connect(
			character.HumanoidRootPart.AncestryChanged,
			(_, parent) => {
				if (parent !== undefined) return;
				this.components
					.waitForComponent<PlayerServer>(this.player.instance)
					.expect()
					.loadCharacter();
			},
		);

		const currentInventory = store.getState(
			selectPlayerInventory(this.player.instance),
		);
		this.updateInventoryFromState(currentInventory, false);
		this.trove.add(
			store.subscribe(
				selectPlayerInventory(this.player.instance),
				(state, _prevState) => {
					this.updateInventoryFromState(state);
				},
			),
		);

		const currentSkills = store.getState(
			selectPlayerSkills(this.player.instance),
		);
		this.updateSkillsFromState(currentSkills, undefined, false);
		this.trove.add(
			store.subscribe(
				selectPlayerSkills(this.player.instance),
				(state, prevState) =>
					this.updateSkillsFromState(state, prevState),
			),
		);

		// TODO: this fires twice?
		Events.item.addToHotbar.connect((player, id, slot) => {
			store.addToHotbar(player, id, slot);
		});
		Events.item.removeFromHotbar.connect((player, id) => {
			store.removeFromHotbar(player, id);
		});

		this.trove.add(this.character.onKilled(() => this.onKilled()));
		this.trove.add(
			this.character.onHealthChanged((newHealth) =>
				this._onHealthChanged(newHealth),
			),
		);

		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.getPlayer().instance) return;
				this.lightAttack();
			}),
		);
		this.trove.add(
			Events.combat.heavyAttack.connect((player) => {
				if (player !== this.getPlayer().instance) return;
				this.heavyAttack();
			}),
		);
		this.trove.add(
			Events.combat.block.connect((player, blockUp) => {
				if (player !== this.getPlayer().instance) return;
				this.block(blockUp);
			}),
		);
	}

	onTick(dt: number): void {
		store.decayStomach(this.player.instance, dt);
		store.decayToxicity(this.player.instance, dt);
	}

	override destroy(): void {
		this.trove.destroy();
		super.destroy();
	}

	private onKilled(): void {
		store.subtractLife(this.player.instance);

		Events.character.killed.fire(this.player.instance);

		task.delay(Players.RespawnTime, () => {
			this.player.loadCharacter().catch(warn);
		});
	}

	getPlayer(): PlayerServer {
		return this.player;
	}

	getCharacter(): CharacterServer {
		return this.character;
	}

	loadHealth(): void {
		let savedHealth = store.getState(
			selectPlayerHealth(this.player.instance),
		);
		if (savedHealth === undefined) error("health not found");
		if (savedHealth < 1) savedHealth = 100;
		this.character.getHumanoid().Health = savedHealth;
	}

	loadConditions(): void {
		const conditions = store.getState(
			selectPlayerConditions(this.player.instance),
		);
		if (conditions === undefined) error("conditions not found");
		for (const condition of conditions) {
			this.instance.AddTag(condition);
		}
	}

	loadTransform(): void {
		const savedTransform = store.getState(
			selectPlayerTransform(this.player.instance),
		);
		if (savedTransform === undefined) error("transform not found");
		this.instance.PivotTo(
			new CFrame(deserializeVector3(savedTransform.position)).mul(
				CFrame.fromOrientation(0, savedTransform.yRotation, 0),
			),
		);
	}

	adjustTemperature(amount: number) {
		const player = this.getPlayer().instance;
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

	private _onHealthChanged(health: number): void {
		store.setHealth(this.getPlayer().instance, health);
	}

	private updateInventoryFromState(
		items?: ReadonlyMap<ItemId, number>,
		autoHotbar = true,
	) {
		if (items === undefined) return;
		for (const [itemId, quantity] of items) {
			const existingItem = this.character.getItem(itemId);
			if (existingItem) {
				if (existingItem.attributes.quantity !== quantity) {
					existingItem.attributes.quantity = quantity;
				}
				continue;
			}

			this.character.giveItem(itemId, quantity);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, itemId);
			}
		}
	}

	private updateSkillsFromState(
		skills?: ReadonlySet<SkillId>,
		prevSkills?: ReadonlySet<SkillId>,
		autoHotbar = true,
	) {
		if (skills === undefined) return;
		for (const skillId of skills) {
			if (prevSkills && prevSkills.has(skillId)) continue;
			this.character.learnSkill(skillId);
			if (autoHotbar) {
				store.addToHotbar(this.player.instance, skillId);
			}
		}
	}

	private getEquippedWeaponConfig(): WeaponConfig {
		let weaponConfig = FISTS_CONFIG;
		// warning: the following code is cooked
		const equippedThing = this.character.getCurrentEquipped();
		if (equippedThing !== undefined) {
			const equippedWeapon = equippedThing as Weapon | undefined;
			if (equippedWeapon !== undefined) {
				const weapon = this.components.getComponent<Weapon>(
					equippedWeapon.instance,
				);
				if (weapon !== undefined) {
					weaponConfig = weapon?.config;
				}
			}
		}
		return weaponConfig;
	}

	private spawnHitbox(
		weaponConfig: WeaponConfig,
		attackData: AttackData,
	): void {
		const size = weaponConfig.hitboxSize;
		const rootPartCFrame = this.character.getHumanoidRootPart().CFrame;
		const hitboxCFrame = rootPartCFrame.add(
			rootPartCFrame.LookVector.mul(size.Z / 2),
		);
		const hits = spawnHitbox(hitboxCFrame, size, [this.instance], true);
		if (hits.size() > 0) {
			hits.forEach((model) =>
				this.hitService.registerHit(
					this.character,
					model,
					weaponConfig,
					attackData,
				),
			);
		}
	}

	private lightAttack(): void {
		if (!this.character.canLightAttack()) return;

		Events.character.stopRun(this.getPlayer().instance);
		const weaponConfig = this.getEquippedWeaponConfig();

		this.character.attributes.combo++;

		if (this.character.attributes.combo > weaponConfig.maxLightAttacks)
			this.character.attributes.combo = weaponConfig.maxLightAttacks;

		const attackSpeed = this.character.getAttackSpeed();

		const animationName = `${weaponConfig.type}${this.character.attributes.combo}`;
		const onSwing = () => {
			Events.playEffect.broadcast(
				"Swing",
				this.instance,
				weaponConfig.type,
			);
		};
		const onContact = () => {
			const isLastHit =
				this.character.attributes.combo >= weaponConfig.maxLightAttacks;
			this.spawnHitbox(weaponConfig, {
				ragdollDuration: isLastHit ? 1 : 0,
				knockbackForce: isLastHit ? 35 : 15,
				knockbackDuration: isLastHit ? 0.5 : 1 / 6,
				breaksBlock: false,
			});

			if (
				this.character.attributes.combo >= weaponConfig.maxLightAttacks
			) {
				this.character.attributes.combo = 0;
				this.character.attributes.isStunned = true;
				task.delay(weaponConfig.endlag / attackSpeed, () => {
					this.character.attributes.isStunned = false;
				});
			}
		};
		const onStopped = () => {
			if (this.comboResetThread !== undefined) {
				task.cancel(this.comboResetThread);
				this.trove.remove(this.comboResetThread);
			}
			this.comboResetThread = this.trove.add(
				task.delay(COMBO_RESET_DELAY, () => {
					this.character.attributes.combo = 0;
					this.comboResetThread = undefined;
				}),
			);
		};

		this.character.attack(
			animationName,
			onSwing,
			onContact,
			onStopped,
			weaponConfig.noJumpDuration,
			0,
		);

		this.character.attributes.lightAttackDebounce = true;
		this.trove.add(
			task.delay(
				weaponConfig.lightAttackCooldown / attackSpeed,
				() => (this.character.attributes.lightAttackDebounce = false),
			),
		);
	}

	private heavyAttack() {
		if (!this.character.canHeavyAttack()) return;

		Events.character.stopRun(this.getPlayer().instance);
		const weaponConfig = this.getEquippedWeaponConfig();

		Events.playEffect.broadcast(
			"HeavyCharge",
			this.instance,
			weaponConfig.type,
		);

		const attackSpeed = this.character.getAttackSpeed();

		const animationName = `${weaponConfig.type}Heavy`;
		const onSwing = () => {
			Events.playEffect.broadcast("StopHeavyCharge", this.instance);
			Events.playEffect.broadcast(
				"HeavySwing",
				this.instance,
				weaponConfig.type,
			);
		};
		const onContact = () => {
			this.spawnHitbox(weaponConfig, {
				ragdollDuration: 1,
				knockbackForce: 35,
				knockbackDuration: 0.5,
				breaksBlock: true,
			});

			// TODO: no endlag if hit something
		};
		const onStopped = () => {};

		this.character.attack(
			animationName,
			onSwing,
			onContact,
			onStopped,
			weaponConfig.endlag * 2,
			weaponConfig.endlag,
		);

		this.character.attributes.heavyAttackDebounce = true;
		this.trove.add(
			task.delay(
				HEAVY_ATTACK_COOLDOWN / attackSpeed,
				() => (this.character.attributes.heavyAttackDebounce = false),
			),
		);

		this.character.setWalkSpeed(this.character.getWalkSpeed() * 0.2);
	}

	private block(blockUp: boolean): void {
		if (blockUp && !this.character.canBlock()) {
			Events.combat.unblock(this.getPlayer().instance);
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}
}
