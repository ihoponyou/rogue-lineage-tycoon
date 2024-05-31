import { Controller, OnStart } from "@flamework/core";
import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";

class IdleState extends State {
	name = "Idle";
}

class AttackState extends State {
	name = "Attack";
	override enter(): void {
		this.busy = true;

		super.enter();
		task.wait(2);

		this.busy = false;
	}
}

class BlockState extends State {
	name = "Block";
}

class ChargeManaState extends State {
	name = "ChargeMana";
}

class RagdollState extends State {
	name = "Ragdoll";
}

class DashState extends State {
	name = "Dash";
}

class RunState extends State {
	name = "Run";
}

class ClimbState extends State {
	name = "Climb";
}

@Controller()
export class StateController implements OnStart {
	private IDLE = new IdleState();
	private ATTACK = new AttackState();
	private BLOCK = new BlockState();
	private CHARGE_MANA = new ChargeManaState();
	private RAGDOLL = new RagdollState();
	private DASH = new DashState();
	private RUN = new RunState();
	private CLIMB = new ClimbState();

	private stateMachine: StateMachine;

	constructor() {
		this.stateMachine = new StateMachine(this.IDLE);
	}

	onStart() {
		this.IDLE.addTransitionTo(this.ATTACK);
		this.IDLE.addTransitionTo(this.BLOCK);
		this.IDLE.addTransitionTo(this.CHARGE_MANA);
		this.IDLE.addTransitionTo(this.RAGDOLL);
		this.IDLE.addTransitionTo(this.DASH);
		this.IDLE.addTransitionTo(this.RUN);
		this.IDLE.addTransitionTo(this.CLIMB);

		this.ATTACK.addTransitionTo(this.IDLE);
		this.ATTACK.addTransitionTo(this.RAGDOLL);

		this.BLOCK.addTransitionTo(this.IDLE);
		this.BLOCK.addTransitionTo(this.RAGDOLL);

		this.CHARGE_MANA.addTransitionTo(this.IDLE);

		this.RAGDOLL.addTransitionTo(this.IDLE);

		this.DASH.addTransitionTo(this.IDLE);
		// this.DASH.addTransitionTo(this.RUN);
		// this.DASH.addTransitionTo(this.CHARGE_MANA);

		this.RUN.addTransitionTo(this.IDLE);
		this.RUN.addTransitionTo(this.BLOCK);
		this.RUN.addTransitionTo(this.CHARGE_MANA);
		this.RUN.addTransitionTo(this.DASH);

		this.CLIMB.addTransitionTo(this.IDLE);
	}

	idle(): void {
		this.stateMachine.transitionTo(this.IDLE);
	}

	attack(): void {
		this.stateMachine.transitionTo(this.ATTACK);
	}

	block(): void {
		this.stateMachine.transitionTo(this.BLOCK);
	}

	chargeMana(): void {
		this.stateMachine.transitionTo(this.CHARGE_MANA);
	}

	ragdoll(): void {
		this.stateMachine.transitionTo(this.RAGDOLL);
	}

	dash(): void {
		this.stateMachine.transitionTo(this.DASH);
	}

	run(): void {
		this.stateMachine.transitionTo(this.RUN);
	}

	climb(): void {
		this.stateMachine.transitionTo(this.CLIMB);
	}
}
