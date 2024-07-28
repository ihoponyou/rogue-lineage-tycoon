import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/networking";
import { SharedComponents } from "shared/components/combat-manager";
import { PlayerServer } from "./player-server";

const M1_RESET_DELAY = 1;

@Component({
	tag: "CombatManager",
	defaults: {
		stunned: false,
		combo: 0,
		lightAttackCooldown: false,
	},
})
export class CombatManager
	extends SharedComponents.CombatManager
	implements OnStart
{
	private maxCombo = 5;
	private attackSpeed = 1;
	private comboReset?: thread;

	public constructor(private playerServer: PlayerServer) {
		super();
	}

	public onStart(): void {
		this.trove.add(
			Events.combat.lightAttack.connect((player) => {
				if (player !== this.instance) return;
				this.handleLightAttack();
			}),
		);
	}

	private handleLightAttack(): void {
		if (!this.canLightAttack()) return;
		const character = this.playerServer.getCharacter();

		this.attributes.lightAttackCooldown = true;
		this.trove.add(
			task.delay(
				0.475 / this.attackSpeed,
				() => (this.attributes.lightAttackCooldown = false),
			),
		);

		character.toggleJump(false);
		this.trove.add(
			task.delay(0.7 / this.attackSpeed, () =>
				character.toggleJump(true),
			),
		);

		if (this.comboReset !== undefined) {
			task.cancel(this.comboReset);
			this.trove.remove(this.comboReset);
		}
		this.comboReset = this.trove.add(
			task.delay(M1_RESET_DELAY, () => {
				this.attributes.combo = 0;
				this.comboReset = undefined;
			}),
		);

		if (++this.attributes.combo >= this.maxCombo) this.attributes.combo = 0;
	}
}
