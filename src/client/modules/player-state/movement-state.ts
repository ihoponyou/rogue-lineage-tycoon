import { MovementController } from "client/modules/controllers/movement-controller";
import { StateController } from "client/modules/controllers/state-controller";
import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";
import { PlayerState } from ".";
import { KeybindController } from "../controllers/keybind-controller";

export abstract class MovementState extends PlayerState {
	constructor(
		stateMachine: StateMachine,
		keybindController: KeybindController,
		protected readonly movementController: MovementController,
	) {
		super(stateMachine, keybindController);
	}
}
