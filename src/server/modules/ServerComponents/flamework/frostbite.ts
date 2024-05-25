import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { IdentityService } from "server/modules/Services/flamework/identity-service";
import { Character } from "./character";

@Component({
	tag: "Frostbite",
	defaults: {
		playEffects: false,
	},
})
export class Frostbite extends BaseInjury {
	readonly name = "Frostbite";

	constructor(
		private identityService: IdentityService,
		protected character: Character,
	) {
		super(character);
	}

	override onStart(): void {
		this.inflict();

		const data = this.character.profile().Data;
		if (data.Temperature === 0) {
			data.Temperature = 15;
		}

		const skinColor = this.character.instance.GetAttribute("SkinColor");
		if (skinColor === undefined) return;
		const [h, s, v] = (skinColor as Color3).ToHSV();
		this.identityService.setCharacterSkinColor(
			this.character.instance,
			Color3.fromHSV(h, s / 2, v),
		);
	}
}
