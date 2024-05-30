import { Controller } from "@flamework/core";
import { StateMachine } from "shared/modules/state-machine";
import { State } from "shared/modules/state-machine/state";
import { ManaController } from "./mana-controller";

class IdleState extends State {
	name = "Idle";
}

class AttackState extends State {
	name = "Attack";
	override enter(): void {
		this.isBusy = true;

		super.enter();
		task.wait(2);

		this.isBusy = false;
	}
}

class DashState extends State {
	name = "Dash";
}

class SprintState extends State {
	name = "Sprint";
}

class BlockState extends State {
	name = "Block";
}

class ChargeManaState extends State {
	name = "ChargeMana";
}

@Controller()
export class StateController {
	private IDLE = new IdleState();
	private ATTACK = new AttackState();
	private DASH = new DashState();
	private SPRINT = new SprintState();
	private BLOCK = new BlockState();
	private CHARGE_MANA = new ChargeManaState();

	private stateMachine: StateMachine;

	constructor() {
		this.IDLE.addTransition(this.ATTACK);
		this.IDLE.addTransition(this.DASH);
		this.IDLE.addTransition(this.SPRINT);
		this.IDLE.addTransition(this.CHARGE_MANA);
		this.IDLE.addTransition(this.BLOCK);

		this.ATTACK.addTransition(this.IDLE);

		this.DASH.addTransition(this.IDLE);
		this.DASH.addTransition(this.SPRINT);
		this.DASH.addTransition(this.CHARGE_MANA);

		this.SPRINT.addTransition(this.IDLE);
		this.SPRINT.addTransition(this.CHARGE_MANA);
		this.SPRINT.addTransition(this.BLOCK);

		this.CHARGE_MANA.addTransition(this.IDLE);

		this.BLOCK.addTransition(this.IDLE);

		this.stateMachine = new StateMachine(this.IDLE);
	}

	attack(): void {
		this.stateMachine.transitionTo(this.ATTACK);
	}

	dash(): void {
		this.stateMachine.transitionTo(this.DASH);
	}

	sprint(): void {
		this.stateMachine.transitionTo(this.SPRINT);
	}

	chargeMana(): void {
		this.stateMachine.transitionTo(this.CHARGE_MANA);
	}

	block(): void {
		this.stateMachine.transitionTo(this.BLOCK);
	}
}
