import { Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { store } from "server/store";
import { APPEARANCE } from "shared/constants";

import { selectPlayer } from "server/store/selectors";
import { BaseInjury } from ".";

const LOWER_TEMPERATURE_THRESHOLD = 95;

@Component({
	tag: "BurnScar",
})
export class BurnScar extends BaseInjury implements OnStart, OnTick {
	public readonly name = "BurnScar";

	public onStart(): void {
		this.inflict();

		const player = this.character.getPlayer();
		const data = store.getState(selectPlayer(player))?.resources;
		if (!data) error("no data");

		if (data.temperature === 100) {
			store.setTemperature(player, 70);
		}

		APPEARANCE.FacialExtras.Scars.BurnScar.Clone().Parent =
			this.character.getHead();
	}

	public onTick(_dt: number): void {
		const characterTemperature = store.getState(
			selectPlayer(this.character.getPlayer()),
		)?.resources.temperature;
		if (characterTemperature === undefined) return;
		if (characterTemperature < LOWER_TEMPERATURE_THRESHOLD) return;
		if (this.instance.HasTag("Burning")) return;

		this.instance.AddTag("Burning");
	}
}
