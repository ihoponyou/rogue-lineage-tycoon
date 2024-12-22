import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Events } from "server/network";
import { store } from "server/store";
import { selectPlayerIdentity } from "server/store/selectors";
import { BASE_MANA_CHARGE_RATE, BASE_MANA_DECAY_RATE } from "shared/configs";
import { PlayerServer } from "./player-server";

const MODIFIER_LABEL = "charging_mana";
const WALK_SPEED_MODIFIER = 0.85;
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

	public onStart(): void {
		Events.mana.charge.connect((player, bool) => {
			if (player !== this.instance) return;
			this.charging = bool;
		});

		const race = store.getState(
			selectPlayerIdentity(this.instance),
		)?.raceName;

		let boost = 0;
		if (race === "Azael") boost = 10;
		else if (race === "Rigan") boost = 15;

		this.chargeRate = BASE_MANA_CHARGE_RATE + boost;

		Events.mana.obtained(this.instance);
		store.toggleManaEnabled(this.instance, true);
	}

	public onTick(dt: number): void {
		const prevAmount = this.amount;
		const character = this.playerServer.getPlayerCharacter().getCharacter();
		if (this.charging) {
			this.amount += this.chargeRate * dt;
			character
				.getWalkSpeed()
				.addModifier(MODIFIER_LABEL, 0.85, false, true);
			if (this.amount >= 100) {
				this.amount = 100;
				this.charging = false;
				Events.mana.filled(this.instance);
				Events.mana.charge(this.instance, false);
			}
		} else if (this.amount > 0) {
			this.amount -= this.decayRate * dt;
			character.getWalkSpeed().removeModifier(MODIFIER_LABEL, false);
			if (this.amount <= 0) {
				this.amount = 0;
				Events.mana.emptied.fire(this.instance);
			}
		}

		if (prevAmount === this.amount) return;
		store.setManaAmount(this.instance, this.amount);
	}

	public override destroy(): void {
		super.destroy();
		Events.mana.disabled(this.instance);
		store.toggleManaEnabled(this.instance, false);
	}
}
