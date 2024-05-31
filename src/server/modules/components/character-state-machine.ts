import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
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

// @Component({
// 	tag: "Character",
// })
export class CharacterStateMachine
	extends BaseComponent<{}, Model>
	implements OnStart
{
	private IDLE = new IdleState();
	private ATTACK = new AttackState();
	private BLOCK = new BlockState();
	private CHARGE_MANA = new ChargeManaState();
	private RAGDOLL = new RagdollState();
	private DASH = new DashState();
	private RUN = new RunState();
	private CLIMB = new ClimbState();

	stateMachine: StateMachine;

	constructor() {
		super();
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
}
