import { Character } from "client/components/character";
import { Events } from "client/network";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterState } from "./character-state";

export class AttackState extends CharacterState {
	public readonly name = "Attack";

	public constructor(stateMachine: StateMachine, character: Character) {
		super(stateMachine, character);
	}

	public override enter(): void {
		Events.combat.lightAttack();
		this.stateMachine.transitionTo("idle");
	}
}
