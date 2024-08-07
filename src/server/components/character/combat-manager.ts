import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { DisposableComponent } from "shared/components/disposable-component";
import { Character } from ".";

const M1_RESET_DELAY = 1;

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

	public constructor(private characterServer: Character) {
		super();
	}

	public onStart(): void {
		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.characterServer.getPlayer()) return;
				this.handleLightAttack();
			}),
		);
		this.trove.add(
			Events.combat.block.connect((player, blockUp) => {
				if (player !== this.characterServer.getPlayer()) return;
				this.handleBlock(blockUp);
			}),
		);
	}

	private handleLightAttack(): void {
		if (!this.characterServer.canLightAttack()) return;
		Events.character.stopRun(this.characterServer.getPlayer());

		this.characterServer.attributes.lightAttackCooldown = true;
		this.trove.add(
			task.delay(
				0.475 / this.attackSpeed,
				() =>
					(this.characterServer.attributes.lightAttackCooldown =
						false),
			),
		);

		this.characterServer.toggleJump(false);
		this.trove.add(
			task.delay(0.7 / this.attackSpeed, () =>
				this.characterServer.toggleJump(true),
			),
		);

		if (this.comboReset !== undefined) {
			task.cancel(this.comboReset);
			this.trove.remove(this.comboReset);
		}
		this.comboReset = this.trove.add(
			task.delay(M1_RESET_DELAY, () => {
				this.characterServer.attributes.combo = 0;
				this.comboReset = undefined;
			}),
		);

		if (++this.characterServer.attributes.combo >= this.maxCombo)
			this.characterServer.attributes.combo = 0;
	}

	private handleBlock(blockUp: boolean): void {
		if (
			this.characterServer.instance.GetAttribute("isRagdolled") === true
		) {
			Events.combat.unblock(this.characterServer.getPlayer());
			return;
		}
		this.characterServer.attributes.isBlocking = blockUp;
	}
}
