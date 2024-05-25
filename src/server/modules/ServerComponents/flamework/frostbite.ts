import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { IdentityService } from "server/modules/Services/flamework/identity-service";
import { Character } from "./character";
import { DataService } from "server/modules/Services/flamework/data-service";

@Component({
	tag: "Frostbite",
})
export class Frostbite extends BaseInjury {
	readonly name = "Frostbite";

	constructor(
		private identityService: IdentityService,
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
