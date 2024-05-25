import { BaseComponent, Component } from "@flamework/components";
import { Character } from "./character";
import { OnStart } from "@flamework/core";

interface Attributes {
	playEffects: boolean;
}

@Component()
export abstract class BaseInjury
	extends BaseComponent<Attributes, StarterCharacter>
	implements OnStart
{
	abstract readonly name: string;

	constructor(protected character: Character) {
		super();
	}

	abstract onStart(): void;

	inflict(): void {
		const profile = this.character.profile();
		if (profile.Data.Conditions.includes(this.name)) return;
		profile.Data.Conditions.push(this.name);

		if (this.attributes.playEffects) this.playInjuryEffects();
	}

	heal(): void {
		const data = this.character.profile().Data;
		const conditions = data.Conditions;
		conditions.remove(conditions.findIndex((value) => value === this.name));

		this.instance.RemoveTag(this.name);
	}

	playInjuryEffects(): void {
		this.instance.Torso.Injure.Emit(1);
		this.instance.Torso.Injured.Play();
	}
}
