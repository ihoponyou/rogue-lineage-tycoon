import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/networking";
import { SharedComponents } from "shared/components/combat-manager";

const M1_RESET_DELAY = 1;

@Component({
	tag: "CombatManager",
	defaults: {
		stunned: false,
		combo: 0,
	},
})
export class CombatManager
	extends SharedComponents.CombatManager
	implements OnStart
{
	private maxCombo = 5;
	private comboReset?: thread;

	public onStart(): void {
		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.instance) return;
				this.handleLightAttack();
			}),
		);
	}

	private handleLightAttack(): void {
		if (!this.canAttack()) return;

		print(this.attributes.combo);

		if (++this.attributes.combo >= this.maxCombo) this.attributes.combo = 0;

		if (this.comboReset !== undefined) task.cancel(this.comboReset);
		this.comboReset = this.trove.add(
			task.delay(M1_RESET_DELAY, () => {
				this.attributes.combo = 0;
				this.comboReset = undefined;
			}),
		);
	}
}
