import { Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { store } from "server/store";
import { APPEARANCE } from "shared/constants";

import {
	selectResources,
	selectTemperature,
} from "shared/store/slices/players/slices/resources/selectors";
import { BaseInjury } from ".";
import { Character } from "../character";

const LOWER_TEMPERATURE_THRESHOLD = 95;

@Component({
	tag: "BurnScar",
})
export class BurnScar extends BaseInjury implements OnStart, OnTick {
	public readonly name = "BurnScar";

	public constructor(protected character: Character) {
		super(character);
	}

	public onStart(): void {
		this.inflict();

		const player = this.character.getPlayer();
		const data = store.getState(selectResources(player.UserId));
		if (!data) error("no data");

		if (data.temperature === 100) {
			store.setTemperature(player.UserId, 70);
		}

		APPEARANCE.FacialExtras.Scars.BurnScar.Clone().Parent =
			this.character.getHead();
	}

	public onTick(_dt: number): void {
		const characterTemperature = store.getState(
			selectTemperature(this.character.getPlayer().UserId),
		);
		if (characterTemperature === undefined) return;
		if (characterTemperature < LOWER_TEMPERATURE_THRESHOLD) return;
		if (this.instance.HasTag("Burning")) return;

		this.instance.AddTag("Burning");
	}
}
