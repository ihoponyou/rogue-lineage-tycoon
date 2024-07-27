import { StateMachine } from "shared/state-machine";
import { State } from "shared/state-machine/state";
import { InputController } from "../controllers/input-controller";

export class IdleState extends State {
	public readonly name = "Idle";

	private runConnection?: RBXScriptConnection;
	private dashConnection?: RBXScriptConnection;
	private climbConnection?: RBXScriptConnection;
	private chargeManaConnection?: RBXScriptConnection;

	public constructor(
		stateMachine: StateMachine,
		private inputController: InputController,
	) {
		super(stateMachine);
	}

	public override enter(): void {
		this.runConnection = this.inputController.runTriggered.Connect(() => {
			this.stateMachine.transitionTo("run");
		});
		this.dashConnection = this.inputController.dashTriggered.Connect(
			(direction) => this.stateMachine.transitionTo("dash", direction),
		);
		this.climbConnection = this.inputController.climbTriggered.Connect(
			(cast) => this.stateMachine.transitionTo("climb", cast),
		);
		this.chargeManaConnection =
			this.inputController.chargeManaTriggered.Connect((charging) => {
				if (charging) this.stateMachine.transitionTo("chargemana");
			});
	}

	public override exit(): void {
		if (this.runConnection) this.runConnection.Disconnect();
		if (this.dashConnection) this.dashConnection.Disconnect();
		if (this.climbConnection) this.climbConnection.Disconnect();
		if (this.chargeManaConnection) this.chargeManaConnection.Disconnect();
	}
}
