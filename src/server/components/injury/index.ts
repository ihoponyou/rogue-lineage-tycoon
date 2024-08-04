import { BaseComponent, Component } from "@flamework/components";
import { store } from "server/store";
import { Condition } from "shared/configs/conditions";
import { Character } from "../character";

@Component()
export abstract class BaseInjury extends BaseComponent<{}, Model> {
	protected abstract readonly name: Condition;

	public constructor(protected character: Character) {
		super();
	}

	public inflict(): void {
		store.addCondition(this.character.getPlayer(), this.name);

		this.playInjuryEffects();
	}

	public heal(): void {
		store.removeCondition(this.character.getPlayer(), this.name);

		this.instance.RemoveTag(this.name);
	}

	public playInjuryEffects(): void {
		const torso = this.character.getTorso();
		torso.Injure.Emit(1);
		torso.Injured.Play();
	}
}
