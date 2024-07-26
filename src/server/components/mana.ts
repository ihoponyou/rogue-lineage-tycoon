import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Events } from "server/networking";
import { store } from "server/store";
import { selectRace } from "shared/store/slices/players/slices/identity/selectors";

const BASE_MANA_CHARGE_RATE = 100 / 3.5;
const BASE_MANA_DECAY_RATE = 100 / 2.5;

// what do the mana events even do?

namespace ServerComponents {
	@Component({
		tag: "Mana",
	})
	export class Mana
		extends BaseComponent<{}, Player>
		implements OnStart, OnTick
	{
		private charging = false;
		private amount = 0;
		private chargeRate = BASE_MANA_CHARGE_RATE;
		private decayRate = BASE_MANA_DECAY_RATE;

		public onStart(): void {
			Events.mana.charge.connect((player, bool) => {
				if (player !== this.instance) return;
				this.charging = bool;
				Events.mana.charge(this.instance, bool);
			});

			const race = store.getState(selectRace(this.instance.UserId));

			let boost = 0;
			if (race === "Azael") boost = 10;
			else if (race === "Rigan") boost = 15;

			this.chargeRate = BASE_MANA_CHARGE_RATE + boost;

			Events.mana.obtained(this.instance);
			store.toggleManaEnabled(this.instance.UserId, true);
		}

		public onTick(dt: number): void {
			this.charging ? this.chargeMana(dt) : this.decayMana(dt);
			store.setManaAmount(this.instance.UserId, this.amount);
		}

		public override destroy(): void {
			super.destroy();
			Events.mana.disabled(this.instance);
			store.toggleManaEnabled(this.instance.UserId, false);
		}

		private chargeMana(deltaTime: number): void {
			if (this.amount === 100) return;

			this.amount = math.min(
				this.amount + this.chargeRate * deltaTime,
				100,
			);

			if (this.amount === 100) {
				this.charging = false;
				Events.mana.filled(this.instance);
				Events.mana.charge(this.instance, false);
			}
		}

		private decayMana(deltaTime: number): void {
			if (this.amount === 0) return;

			const decayRate = this.decayRate; // if climbing then half

			this.amount -= math.min(this.amount, decayRate * deltaTime);
			if (this.amount === 0) {
				Events.mana.emptied(this.instance);
			}
		}
	}
}
