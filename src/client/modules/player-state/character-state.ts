import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";
import { CharacterClient } from "../components/character-client";

export abstract class CharacterState extends State {
	constructor(
		stateMachine: StateMachine,
		protected character: CharacterClient,
	) {
		super(stateMachine);
	}
}
