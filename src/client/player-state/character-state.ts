import { StateMachine } from "shared/state-machine";
import { State } from "shared/state-machine/state";
import { Character } from "../components/character";

export abstract class CharacterState extends State {
	public constructor(
		stateMachine: StateMachine,
		protected character: Character,
	) {
		super(stateMachine);
	}
}
