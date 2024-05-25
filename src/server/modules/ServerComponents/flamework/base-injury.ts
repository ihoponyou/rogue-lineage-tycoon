import { BaseComponent, Component } from "@flamework/components";
import { Character } from "./character";
import { OnStart } from "@flamework/core";
import { DataService } from "server/modules/Services/flamework/data-service";

interface Attributes {
	playEffects: boolean;
}

@Component({
	defaults: {
		playEffects: false,
	},
})
export abstract class BaseInjury
	extends BaseComponent<Attributes, StarterCharacter>
	implements OnStart
{
	abstract readonly name: string;

	constructor(
		protected character: Character,
		protected dataService: DataService,
	) {
		super();
	}

	abstract onStart(): void;

	inflict(): void {
		const data = this.dataService.getProfile(
			this.character.getPlayer(),
		).Data;
		if (data.Conditions.includes(this.name)) return;
		data.Conditions.push(this.name);

		if (this.attributes.playEffects) this.playInjuryEffects();
	}

	heal(): void {
		const data = this.dataService.getProfile(
			this.character.getPlayer(),
		).Data;
		const conditions = data.Conditions;
		conditions.remove(conditions.findIndex((value) => value === this.name));

		this.instance.RemoveTag(this.name);
	}

	playInjuryEffects(): void {
		this.instance.Torso.Injure.Emit(1);
		this.instance.Torso.Injured.Play();
	}
}
