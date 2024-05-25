import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { Character } from "./character";
import { ReplicatedStorage } from "@rbxts/services";

@Component({
	tag: "Frostbite",
	defaults: {
		playEffects: false,
	},
})
export class Frostbite extends BaseInjury {
	readonly name = "Frostbite";

	constructor(protected character: Character) {
		super(character);
	}

	override onStart(): void {
		this.inflict();

		const data = this.character.profile().Data;
		if (data.Temperature === 100) {
			data.Temperature = 70;
		}

		ReplicatedStorage.Appearance.FacialExtras.Scars.BurnScar.Clone().Parent =
			this.character.instance.Head;
	}
}
