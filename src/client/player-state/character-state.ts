import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";
import { Character } from "../components/character";

export abstract class CharacterState extends State {
	public constructor(
		stateMachine: StateMachine,
		protected character: Character,
	) {
		super(stateMachine);
	}
}
