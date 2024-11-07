import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Trove } from "@rbxts/trove";
import { AttackData } from "server/modules/attack-data";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { CharacterServer } from ".";
import { PlayerCharacter } from "../player-character";
import { Weapon } from "../weapon";

const COMBO_RESET_DELAY = 2;
const HEAVY_ATTACK_COOLDOWN = 3;
const FISTS_CONFIG = getWeaponConfig("Fists");

@Component({
	tag: "CombatManager",
})
export class CombatManager extends BaseComponent<{}, Model> implements OnStart {
	private attackSpeed = 1;
	private comboReset?: thread;
	private walkSpeedReset?: thread;

	private trove = new Trove();

	constructor(
		private components: Components,
		private character: CharacterServer,
		private playerCharacter: PlayerCharacter,
		private hitService: HitService,
	) {
		super();
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	onStart(): void {
		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.playerCharacter.getPlayer().instance)
					return;
				this.handleLightAttack();
			}),
		);
		this.trove.add(
			Events.combat.block.connect((player, blockUp) => {
				if (player !== this.playerCharacter.getPlayer().instance)
					return;
				this.handleBlock(blockUp);
			}),
		);
		this.trove.add(
			Events.combat.heavyAttack.connect((player) => {
				if (player !== this.playerCharacter.getPlayer().instance)
					return;
				this.handleHeavyAttack();
			}),
		);
	}

	attack(
		animationName: string,
		noJumpDuration: number = 0,
		onSwing: Callback,
		onContact: Callback,
		onStopped: Callback,
	): void {
		this.character.attributes.isAttacking = true;

		Events.character.stopRun(this.playerCharacter.getPlayer().instance);

		if (noJumpDuration > 0) {
			this.character.toggleJump(false);
		}

		const swingConn = this.character.connectToAnimationMarker(
			animationName,
			"swing",
			onSwing,
		);
		const contactConn = this.character.connectToAnimationMarker(
			animationName,
			"contact",
			onContact,
		);
		const stoppedConn = this.character.connectToAnimationStopped(
			animationName,
			() => {
				swingConn?.Disconnect();
				contactConn?.Disconnect();
				stoppedConn?.Disconnect();

				this.character.attributes.isAttacking = false;

				if (noJumpDuration > 0) {
					this.trove.add(
						task.delay(noJumpDuration / this.attackSpeed, () =>
							this.character.toggleJump(true),
						),
					);
				}

				onStopped();
			},
		);
		this.character.playAnimation(animationName, this.attackSpeed);
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
		const hits = spawnHitbox(
			hitboxCFrame,
			size,
			[this.playerCharacter.instance],
			true,
		);
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

	private handleBlock(blockUp: boolean): void {
		if (blockUp && !this.character.canBlock()) {
			Events.combat.unblock(this.playerCharacter.getPlayer().instance);
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}

	private handleLightAttack(): void {
		if (!this.character.canLightAttack()) return;

		const weaponConfig = this.getEquippedWeaponConfig();

		this.character.attributes.combo++;

		if (this.character.attributes.combo > weaponConfig.maxLightAttacks)
			this.character.attributes.combo = weaponConfig.maxLightAttacks;

		const animationName = `${weaponConfig.type}${this.character.attributes.combo}`;
		const onSwing = () => {
			Events.playEffect.broadcast(
				"Swing",
				this.playerCharacter.instance,
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
				task.delay(weaponConfig.endlag / this.attackSpeed, () => {
					this.character.attributes.isStunned = false;
				});
			}
		};
		const onStopped = () => {
			if (this.comboReset !== undefined) {
				task.cancel(this.comboReset);
				this.trove.remove(this.comboReset);
			}
			this.comboReset = this.trove.add(
				task.delay(COMBO_RESET_DELAY, () => {
					this.character.attributes.combo = 0;
					this.comboReset = undefined;
				}),
			);
		};

		this.attack(
			animationName,
			weaponConfig.noJumpDuration,
			onSwing,
			onContact,
			onStopped,
		);

		this.character.attributes.lightAttackDebounce = true;
		this.trove.add(
			task.delay(
				weaponConfig.lightAttackCooldown / this.attackSpeed,
				() => (this.character.attributes.lightAttackDebounce = false),
			),
		);
	}

	private handleHeavyAttack() {
		if (!this.character.canHeavyAttack()) return;

		const weaponConfig = this.getEquippedWeaponConfig();

		Events.playEffect.broadcast(
			"HeavyCharge",
			this.playerCharacter.instance,
			weaponConfig.type,
		);

		const animationName = `${weaponConfig.type}Heavy`;
		const onSwing = () => {
			Events.playEffect.broadcast(
				"StopHeavyCharge",
				this.playerCharacter.instance,
			);
			Events.playEffect.broadcast(
				"HeavySwing",
				this.playerCharacter.instance,
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
		const onStopped = () => {
			this.character.attributes.isStunned = true;
			// use double m1 endlag
			task.delay((weaponConfig.endlag * 2) / this.attackSpeed, () => {
				this.character.attributes.isStunned = false;
				this.character.toggleJump(true);
				this.character.resetWalkSpeed();
			});
		};
		this.attack(
			animationName,
			weaponConfig.endlag * 2,
			onSwing,
			onContact,
			onStopped,
		);

		this.character.attributes.heavyAttackDebounce = true;
		this.trove.add(
			task.delay(
				HEAVY_ATTACK_COOLDOWN / this.attackSpeed,
				() => (this.character.attributes.heavyAttackDebounce = false),
			),
		);

		this.character.setWalkSpeed(this.character.getWalkSpeed() * 0.2);
	}
}
