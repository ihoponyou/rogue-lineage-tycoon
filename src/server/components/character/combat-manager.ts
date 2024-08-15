import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { DisposableComponent } from "shared/components/disposable-component";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { Character } from ".";

const M1_RESET_DELAY = 2;
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
		private character: Character,
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
	}

	private spawnHitbox(weaponConfig: WeaponConfig): void {
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
				),
			);
		}
	}

	private handleLightAttack(): void {
		if (!this.character.canLightAttack()) return;

		const weaponConfig =
			this.character.getHeldWeapon()?.config ?? FISTS_CONFIG;

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
				this.spawnHitbox(weaponConfig);

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

				if (this.comboReset !== undefined) {
					task.cancel(this.comboReset);
					this.trove.remove(this.comboReset);
				}
				this.comboReset = this.trove.add(
					task.delay(M1_RESET_DELAY, () => {
						this.character.attributes.combo = 0;
						this.comboReset = undefined;
					}),
				);
			},
		);
		this.character.playAnimation(animationName, this.attackSpeed);

		this.character.attributes.lightAttackCooldown = true;
		this.trove.add(
			task.delay(
				weaponConfig.lightAttackCooldown / this.attackSpeed,
				() => (this.character.attributes.lightAttackCooldown = false),
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
		if (!this.character.canBlock()) {
			Events.combat.unblock(this.character.getPlayer());
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}
}
