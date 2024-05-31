import { State } from "shared/modules/state-machine/state";
import { KeybindController } from "../controllers/keybind-controller";
import { StateMachine } from "shared/modules/state-machine";

export abstract class PlayerState extends State {
	constructor(
		stateMachine: StateMachine,
		protected readonly keybindController: KeybindController,
	) {
		super(stateMachine);
	}
}
