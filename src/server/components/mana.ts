import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Events } from "server/network";
import { store } from "server/store";
import { BASE_MANA_CHARGE_RATE, BASE_MANA_DECAY_RATE } from "shared/configs";
import { StatModifierType } from "shared/modules/stat";
import { PlayerServer } from "./player-server";

const MODIFIER_LABEL = "charging_mana";
const WALK_SPEED_MODIFIER = 0.8;
// what do the mana events even do?

@Component({
	tag: "Mana",
})
export class Mana extends BaseComponent<{}, Player> implements OnStart, OnTick {
	private charging = false;
	private amount = 0;
	private chargeRate = BASE_MANA_CHARGE_RATE;
	private decayRate = BASE_MANA_DECAY_RATE;

	constructor(private playerServer: PlayerServer) {
		super();
	}

	onStart(): void {
		Events.mana.charge.connect((player, bool) => {
			if (player !== this.instance) return;
			this.charging = bool;
			const character = this.playerServer
				.getPlayerCharacter()
				.getCharacter();

			if (this.charging) {
				character.walkSpeed.addModifier(
					MODIFIER_LABEL,
					StatModifierType.Multiplier,
					WALK_SPEED_MODIFIER,
					true,
				);
			} else {
				character.walkSpeed.removeModifier(
					MODIFIER_LABEL,
					StatModifierType.Multiplier,
				);
			}
		});

		const playerCharacter = this.playerServer.getPlayerCharacter();
		playerCharacter
			.getCharacter()
			.onAttributeChanged("isDashing", (isDashing) => {
				if (playerCharacter.isDefaultDashing() && this.charging) {
					this.charging = false;
				}
			});

		const boost = 0;

		this.chargeRate = BASE_MANA_CHARGE_RATE + boost;

		Events.mana.obtained(this.instance);
		store.toggleManaEnabled(this.instance, true);
	}

	onTick(dt: number): void {
		const prevAmount = this.amount;
		if (this.charging) {
			this.amount += this.chargeRate * dt;

			if (this.amount >= 100) {
				this.amount = 100;
				this.charging = false;
				Events.mana.filled(this.instance);
				Events.mana.charge(this.instance, false);
			}
		} else if (this.amount > 0) {
			this.amount -= this.decayRate * dt;

			if (this.amount <= 0) {
				this.amount = 0;
				Events.mana.emptied.fire(this.instance);
			}
		}

		if (prevAmount === this.amount) return;
		store.setManaAmount(this.instance, this.amount);
	}

	override destroy(): void {
		super.destroy();
		Events.mana.disabled(this.instance);
		store.toggleManaEnabled(this.instance, false);
	}
}
