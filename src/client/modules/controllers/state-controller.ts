import { Controller, OnStart, OnTick } from "@flamework/core";
import { StateMachine } from "shared/modules/state-machine";
import { MovementController } from "./movement-controller";
import { IdleState } from "client/modules/player-state/idle-state";
import { DashState } from "client/modules/player-state/dash-state";
import { RunState } from "client/modules/player-state/run-state";
import { ClimbState } from "client/modules/player-state/climb-state";
import { KeybindController } from "./keybind-controller";

@Controller()
export class StateController implements OnStart, OnTick {
	readonly IDLE: IdleState;
	// readonly ATTACK: AttackSt;
	// readonly BLOCK: BlockState;
	// readonly CHARGE_MANA: ChargeManaState;
	// readonly RAGDOLL: RagdollState;
	readonly DASH: DashState;
	readonly RUN: RunState;
	readonly CLIMB: ClimbState;

	readonly stateMachine: StateMachine;

	constructor(
		private movementController: MovementController,
		private keybindController: KeybindController,
	) {
		this.stateMachine = new StateMachine();

		this.IDLE = new IdleState(this.stateMachine, keybindController);
		this.DASH = new DashState(
			this.stateMachine,
			keybindController,
			movementController,
		);
		this.RUN = new RunState(
			this.stateMachine,
			keybindController,
			movementController,
		);
		this.CLIMB = new ClimbState(
			this.stateMachine,
			keybindController,
			movementController,
		);

		this.stateMachine.addStates([
			this.IDLE,
			this.DASH,
			this.RUN,
			this.CLIMB,
		]);
	}

	onStart() {
		this.stateMachine.initialize(this.IDLE);
	}

	onTick(dt: number): void {
		this.stateMachine.update(dt);
	}
}
