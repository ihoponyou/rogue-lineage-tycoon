import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { Condition } from "shared/configs/conditions";
import { CharacterServer } from "../character-server";

@Component()
export abstract class BaseInjury
	extends BaseComponent<{}, Model>
	implements OnStart
{
	abstract readonly name: Condition;

	constructor(protected character: CharacterServer) {
		super();
	}

	abstract onStart(): void;

	inflict(): void {
		store.addCondition(this.character.getPlayer().UserId, this.name);

		this.playInjuryEffects();
	}

	heal(): void {
		store.removeCondition(this.character.getPlayer().UserId, this.name);

		this.instance.RemoveTag(this.name);
	}

	playInjuryEffects(): void {
		const torso = this.character.getTorso();
		torso.Injure.Emit(1);
		torso.Injured.Play();
	}
}
