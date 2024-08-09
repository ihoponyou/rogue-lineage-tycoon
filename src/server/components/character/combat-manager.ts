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

	public constructor(private character: Character) {
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

	private handleLightAttack(): void {
		if (!this.character.canLightAttack()) return;
		Events.character.stopRun(this.character.getPlayer());

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

		if (++this.character.attributes.combo >= this.maxCombo)
			this.character.attributes.combo = 0;
	}

	private handleBlock(blockUp: boolean): void {
		if (!this.character.canBlock()) {
			Events.combat.unblock(this.character.getPlayer());
			return;
		}
		this.character.attributes.isBlocking = blockUp;
	}
}
