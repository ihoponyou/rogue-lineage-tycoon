import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";
import { InputController } from "../controllers/input-controller";

export class IdleState extends State {
	readonly name = "Idle";

	private runConnection?: RBXScriptConnection;
	private dashConnection?: RBXScriptConnection;

	constructor(
		stateMachine: StateMachine,
		private inputController: InputController,
	) {
		super(stateMachine);
	}

	override enter(...args: Array<unknown>): void {
		this.runConnection = this.inputController.runTriggered.Connect(() => {
			this.stateMachine.transitionTo("run");
		});
		this.dashConnection = this.inputController.dashTriggered.Connect(
			(direction) => {
				this.stateMachine.transitionTo("dash", direction);
			},
		);
	}

	override exit(): void {
		if (this.runConnection) this.runConnection.Disconnect();
		if (this.dashConnection) this.dashConnection.Disconnect();
	}
}
