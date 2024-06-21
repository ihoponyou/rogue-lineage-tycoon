import { BaseComponent, Component } from "@flamework/components";
import { CharacterServer } from "../character-server";
import { OnStart } from "@flamework/core";
import { DataService } from "server/services/data-service";

@Component()
export abstract class BaseInjury
	extends BaseComponent<{}, Model>
	implements OnStart
{
	abstract readonly name: string;

	constructor(
		protected character: CharacterServer,
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

		this.playInjuryEffects();
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
		const torso = this.character.getTorso();
		torso.Injure.Emit(1);
		torso.Injured.Play();
	}
}
