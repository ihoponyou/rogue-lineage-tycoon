import { MovementState } from "./movement-state";

export class RunState extends MovementState {
	readonly name = "run";

	override enter(): void {
		this.movementController.startRun();
		this.keybindController.loadKeybind(
			"forward",
			this.keybindController.keybinds.forward,
			(state) => this.handleForwardInput(state),
		);

		this.keybindController.loadKeybind(
			"dash",
			this.keybindController.keybinds.dash,
			(state) => this.handleDashInput(state),
		);
	}

	override exit(): void {
		this.movementController.stopRun();
		this.keybindController.unloadKeybind("forward");
		this.keybindController.unloadKeybind("dash");
	}

	private handleForwardInput(
		inputState: Enum.UserInputState,
	): Enum.ContextActionResult {
		if (inputState !== Enum.UserInputState.End)
			return Enum.ContextActionResult.Pass;

		this.stateMachine.transitionTo("idle");

		return Enum.ContextActionResult.Sink;
	}

	private handleDashInput(inputState: Enum.UserInputState) {
		if (inputState !== Enum.UserInputState.Begin) return;

		this.stateMachine.transitionTo("dash");
	}
}
