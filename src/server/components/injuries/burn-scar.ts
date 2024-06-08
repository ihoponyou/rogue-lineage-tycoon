import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { CharacterServer } from "../character-server";
import { ReplicatedStorage } from "@rbxts/services";
import { DataService } from "server/services/data-service";
import { OnTick } from "@flamework/core";

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

		const data = this.dataService.getProfile(
			this.character.getPlayer(),
		).Data;

		if (data.Temperature === 100) {
			data.Temperature = 70;
		}

		ReplicatedStorage.Appearance.FacialExtras.Scars.BurnScar.Clone().Parent =
			this.character.getHead();
	}

	onTick(dt: number): void {
		if (this.character.attributes.temperature < LOWER_TEMPERATURE_THRESHOLD)
			return;
		if (this.instance.HasTag("Burning")) return;

		this.instance.AddTag("Burning");
	}
}
