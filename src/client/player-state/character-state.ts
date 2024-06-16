import { StateMachine } from "shared/state-machine";
import { State } from "shared/state-machine/state";
import { CharacterClient } from "../components/character-client";

export abstract class CharacterState extends State {
	constructor(
		stateMachine: StateMachine,
		protected character: CharacterClient,
	) {
		super(stateMachine);
	}
}
