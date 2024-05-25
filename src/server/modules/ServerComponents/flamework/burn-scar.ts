import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { Character } from "./character";
import { ReplicatedStorage } from "@rbxts/services";
import { DataService } from "server/modules/Services/flamework/data-service";

@Component({
	tag: "Frostbite",
	defaults: {
		playEffects: false,
	},
})
export class Frostbite extends BaseInjury {
	readonly name = "Frostbite";

	constructor(
		protected character: Character,
		protected dataService: DataService,
	) {
		super(character, dataService);
	}

	override onStart(): void {
		this.inflict();

		const data = this.dataService.getProfile(
			this.character.getPlayer(),
		).Data;

		if (data.Temperature === 100) {
			data.Temperature = 70;
		}

		ReplicatedStorage.Appearance.FacialExtras.Scars.BurnScar.Clone().Parent =
			this.character.instance.Head;
	}
}
