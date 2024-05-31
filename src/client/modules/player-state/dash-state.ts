import { Direction } from "client/modules/controllers/movement-controller";
import { MovementState } from "./movement-state";

export class DashState extends MovementState {
	readonly name = "Dash";

	override enter(): void {
		// if (!typeIs(args[0], "string")) error("direction must be string");
		// TODO: more type checking :^)

		let direction: Direction = "backward";
		if (this.keybindController.isKeyDown("forward")) {
			direction = "forward";
		} else if (this.keybindController.isKeyDown("left")) {
			direction = "left";
		} else if (this.keybindController.isKeyDown("right")) {
			direction = "right";
		}

		this.movementController.startDash(direction);
	}

	override update(): void {
		if (!this.movementController.isDodging)
			this.stateMachine.transitionTo("idle");
	}

	override exit(): void {
		this.movementController.stopDash();
	}
}
