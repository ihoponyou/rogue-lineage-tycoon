import { BaseComponent, Component } from "@flamework/components";
import { store } from "server/store";
import { Condition } from "shared/configs/conditions";
import { CharacterServer } from "../character-server";
import { PlayerCharacter } from "../player-character";

@Component()
export abstract class BaseInjury extends BaseComponent<{}, Model> {
	abstract readonly name: Condition;

	constructor(
		protected playerCharacter: PlayerCharacter,
		protected character: CharacterServer,
	) {
		super();
	}

	inflict(): void {
		store.addCondition(
			this.playerCharacter.getPlayer().instance,
			this.name,
		);

		this.playInjuryEffects();
	}

	heal(): void {
		store.removeCondition(
			this.playerCharacter.getPlayer().instance,
			this.name,
		);

		this.instance.RemoveTag(this.name);
	}

	playInjuryEffects(): void {
		const torso = this.character.getTorso();
		// TODO: create these at runtime
		const injureParticle = torso.FindFirstChild("Injure") as
			| ParticleEmitter
			| undefined;
		injureParticle?.Emit(1);

		const injureSound = torso.FindFirstChild("Injured") as
			| Sound
			| undefined;
		injureParticle?.Emit(1);
		injureSound?.Play();
	}
}
