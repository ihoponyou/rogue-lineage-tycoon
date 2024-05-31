import { MovementState } from "./movement-state";

export class ClimbState extends MovementState {
	readonly name = "Climb";

	override enter(...args: Array<unknown>): void {
		if (!typeIs(args[0], "RaycastResult"))
			error("wallCast must be a RaycastResult");

		super.enter(...args);

		this.movementController.startClimb(args[0]);
	}
}
