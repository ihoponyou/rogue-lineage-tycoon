import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { DisposableComponent } from "shared/components/disposable-component";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { CharacterServer } from ".";
import { AttackData } from "../../../../types/AttackData";

const COMBO_RESET_DELAY = 2;
const HEAVY_ATTACK_COOLDOWN = 3;
const FISTS_CONFIG = getWeaponConfig("Fists");

@Component({
	tag: "CombatManager",
})
export class CombatManager
	extends DisposableComponent<{}, Model>
	implements OnStart
{
	private attackSpeed = 1;
	private comboReset?: thread;
	private walkSpeedReset?: thread;

	public constructor(
		private character: CharacterServer,
		private hitService: HitService,
	) {
		super();
	}

	public onStart(): void {
		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.character.getPlayer()) return;
				this.handleLightAttack();
			}),
		);
		this.trove.add(
			Events.combat.block.connect((player, blockUp) => {
				if (player !== this.character.getPlayer()) return;
				this.handleBlock(blockUp);
			}),
		);
		this.trove.add(
			Events.combat.heavyAttack.connect((player) => {
				if (player !== this.character.getPlayer()) return;
				this.handleHeavyAttack();
			}),
		);
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
			[this.character.instance],
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

	private handleLightAttack(): void {
		if (!this.character.canLightAttack()) return;

		this.character.attributes.isAttacking = true;

		// error("fix me");
		const weaponConfig = FISTS_CONFIG;
		// this.character.getHeldWeapon()?.config ?? FISTS_CONFIG;

		Events.character.stopRun(this.character.getPlayer());

		this.character.attributes.combo++;

		if (this.character.attributes.combo > weaponConfig.maxLightAttacks)
			this.character.attributes.combo = weaponConfig.maxLightAttacks;

		const animationName = `${weaponConfig.type}${this.character.attributes.combo}`;

		const swingConn = this.character.connectToAnimationMarker(
			animationName,
			"swing",
			() => {
				Events.playEffect.broadcast(
					"Swing",
					this.character.instance,
					weaponConfig.type,
				);
			},
		);
		const contactConn = this.character.connectToAnimationMarker(
			animationName,
			"contact",
			() => {
				const isLastHit =
					this.character.attributes.combo >=
					weaponConfig.maxLightAttacks;
				this.spawnHitbox(weaponConfig, {
					ragdollDuration: isLastHit ? 1 : 0,
					knockbackForce: isLastHit ? 35 : 15,
					knockbackDuration: isLastHit ? 0.5 : 1 / 6,
					breaksBlock: false,
				});

				if (
					this.character.attributes.combo >=
					weaponConfig.maxLightAttacks
				) {
					this.character.attributes.combo = 0;
					this.character.attributes.isStunned = true;
					task.delay(weaponConfig.endlag / this.attackSpeed, () => {
						this.character.attributes.isStunned = false;
					});
				}
			},
		);
		const stoppedConn = this.character.connectToAnimationStopped(
			animationName,
			() => {
				swingConn?.Disconnect();
				contactConn?.Disconnect();
				stoppedConn?.Disconnect();

				this.character.attributes.isAttacking = false;

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
			},
		);
		this.character.playAnimation(animationName, this.attackSpeed);

		this.character.attributes.lightAttackDebounce = true;
		this.trove.add(
			task.delay(
				weaponConfig.lightAttackCooldown / this.attackSpeed,
				() => (this.character.attributes.lightAttackDebounce = false),
			),
		);

		this.character.toggleJump(false);
		this.trove.add(
			task.delay(weaponConfig.noJumpDuration / this.attackSpeed, () =>
				this.character.toggleJump(true),
			),
		);
	}

	private handleBlock(blockUp: boolean): void {
		if (blockUp && !this.character.canBlock()) {
			Events.combat.unblock(this.character.getPlayer());
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}

	private handleHeavyAttack() {
		if (!this.character.canHeavyAttack()) return;

		this.character.attributes.isAttacking = true;

		const weaponConfig = FISTS_CONFIG;
		// this.character.getHeldWeapon()?.config ?? FISTS_CONFIG;

		Events.character.stopRun(this.character.getPlayer());

		Events.playEffect.broadcast(
			"HeavyCharge",
			this.character.instance,
			weaponConfig.type,
		);

		const animationName = `${weaponConfig.type}Heavy`;

		const swingConn = this.character.connectToAnimationMarker(
			animationName,
			"swing",
			() => {
				Events.playEffect.broadcast(
					"StopHeavyCharge",
					this.character.instance,
				);
				Events.playEffect.broadcast(
					"HeavySwing",
					this.character.instance,
					weaponConfig.type,
				);
			},
		);
		const contactConn = this.character.connectToAnimationMarker(
			animationName,
			"contact",
			() => {
				this.spawnHitbox(weaponConfig, {
					ragdollDuration: 1,
					knockbackForce: 35,
					knockbackDuration: 0.5,
					breaksBlock: true,
				});

				// TODO: no endlag if hit something
			},
		);
		const stoppedConn = this.character.connectToAnimationStopped(
			animationName,
			() => {
				swingConn?.Disconnect();
				contactConn?.Disconnect();
				stoppedConn?.Disconnect();

				this.character.attributes.isAttacking = false;

				this.character.attributes.isStunned = true;
				task.delay((weaponConfig.endlag * 2) / this.attackSpeed, () => {
					this.character.attributes.isStunned = false;
					this.character.toggleJump(true);
					this.character.resetWalkSpeed();
				});
			},
		);
		this.character.playAnimation(animationName, this.attackSpeed);

		this.character.attributes.heavyAttackDebounce = true;
		this.trove.add(
			task.delay(
				HEAVY_ATTACK_COOLDOWN / this.attackSpeed,
				() => (this.character.attributes.heavyAttackDebounce = false),
			),
		);

		this.character.toggleJump(false);
		this.character.setWalkSpeed(this.character.getWalkSpeed() * 0.2);
	}
}
