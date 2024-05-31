import { StateMachine } from "shared/modules/state-machine";
import { State } from "../../../shared/modules/state-machine/state";
import { KeybindController } from "client/modules/controllers/keybind-controller";
import { StateController } from "client/modules/controllers/state-controller";
import { PlayerState } from ".";

const RUN_INPUT_INTERVAL = 0.2;

// standing still / walking around
export class IdleState extends PlayerState {
	readonly name = "idle";

	private lastForwardInputTick = 0;

	constructor(
		stateMachine: StateMachine,
		keybindController: KeybindController,
	) {
		super(stateMachine, keybindController);
	}

	override enter(...args: Array<unknown>): void {
		this.keybindController.loadKeybind(
			"forward",
			this.keybindController.keybinds.forward,
			(state) => this.handleForwardInput(state),
		);
	}

	override exit(): void {
		this.keybindController.unloadKeybind("forward");
	}

	private handleForwardInput(
		inputState: Enum.UserInputState,
	): Enum.ContextActionResult {
		if (inputState !== Enum.UserInputState.Begin)
			return Enum.ContextActionResult.Pass;

		const now = tick();
		if (now - this.lastForwardInputTick < RUN_INPUT_INTERVAL) {
			this.stateMachine.transitionTo("Run");
		}
		this.lastForwardInputTick = now;

		return Enum.ContextActionResult.Sink;
	}
}
