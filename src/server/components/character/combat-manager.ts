import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { DisposableComponent } from "shared/components/disposable-component";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { Character } from ".";

const M1_RESET_DELAY = 1;
const FISTS_CONFIG = getWeaponConfig("Fists");

@Component({
	tag: "CombatManager",
})
export class CombatManager
	extends DisposableComponent<{}, Model>
	implements OnStart
{
	private maxCombo = 5;
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

	private onContact(weaponConfig: WeaponConfig): void {
		const size = new Vector3(6, 6, 5);
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
		if (this.character.attributes.combo >= this.maxCombo) {
			this.character.setWalkSpeed(0);
			task.delay(0.5 / this.attackSpeed, () => {
				this.character.resetWalkSpeed();
			});
		}
	}

	private handleLightAttack(): void {
		if (!this.character.canLightAttack()) return;

		const config = this.character.getHeldWeapon()?.config ?? FISTS_CONFIG;

		Events.character.stopRun(this.character.getPlayer());
		const animationName = `${config.type}${this.character.attributes.combo + 1}`;
		this.character.playAnimation(animationName);
		this.character.attributes.combo++;

		const contactConn = this.character.connectToAnimationMarker(
			animationName,
			"contact",
			() => this.onContact(config),
		);
		const stoppedConn = this.character.connectToAnimationStopped(
			animationName,
			() => {
				contactConn?.Disconnect();
				stoppedConn?.Disconnect();
			},
		);

		Events.playEffect.broadcast(
			"Swing",
			this.character.instance,
			config.type,
		);

		this.character.attributes.lightAttackCooldown = true;
		this.trove.add(
			task.delay(
				0.475 / this.attackSpeed,
				() => (this.character.attributes.lightAttackCooldown = false),
			),
		);

		this.character.toggleJump(false);
		this.trove.add(
			task.delay(0.7 / this.attackSpeed, () =>
				this.character.toggleJump(true),
			),
		);

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

		if (this.character.attributes.combo >= this.maxCombo) {
			this.character.attributes.combo = 0;
		}
	}

	private handleBlock(blockUp: boolean): void {
		if (!this.character.canBlock()) {
			Events.combat.unblock(this.character.getPlayer());
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}
}
