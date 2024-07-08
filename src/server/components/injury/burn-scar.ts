import { Component } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { DataService } from "server/services/data-service";
import { store } from "server/store";
import { APPEARANCE } from "shared/constants";
import { selectResources } from "shared/store/selectors/players";
import { BaseInjury } from ".";
import { CharacterServer } from "../character-server";

const LOWER_TEMPERATURE_THRESHOLD = 95;

@Component({
	tag: "BurnScar",
})
export class BurnScar extends BaseInjury implements OnTick {
	readonly name = "BurnScar";

	constructor(
		protected character: CharacterServer,
		protected dataService: DataService,
	) {
		super(character, dataService);
	}

	onStart(): void {
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

	onTick(dt: number): void {
		if (this.character.attributes.temperature < LOWER_TEMPERATURE_THRESHOLD)
			return;
		if (this.instance.HasTag("Burning")) return;

		this.instance.AddTag("Burning");
	}
}
