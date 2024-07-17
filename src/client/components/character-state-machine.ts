import { Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { StateMachine } from "shared/state-machine";
import { AnimationController } from "../controllers/animation-controller";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { ManaController } from "../controllers/mana-controller";
import { ChargeManaState } from "../player-state/charge-mana-state";
import { ClimbState } from "../player-state/climb-state";
import { DashState } from "../player-state/dash-state";
import { IdleState } from "../player-state/idle-state";
import { RunState } from "../player-state/run-state";
import { CharacterClient } from "./character-client";

@Component()
export class CharacterStateMachine
	extends DisposableComponent<{}, Instance>
	implements OnStart, OnTick
{
	private stateMachine = new StateMachine();
	private IDLE!: IdleState;
	private RUN!: RunState;
	private DASH!: DashState;
	private CLIMB!: ClimbState;
	private CHARGE_MANA!: ChargeManaState;

	constructor(
		private character: CharacterClient,
		private inputController: InputController,
		private keybindController: KeybindController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super();
	}

	public onStart(): void {
		this.trove.add(this.stateMachine);

		this.IDLE = new IdleState(this.stateMachine, this.inputController);
		this.RUN = new RunState(
			this.stateMachine,
			this.character,
			this.keybindController,
			this.inputController,
			this.manaController,
			this.animationController,
		);
		this.DASH = new DashState(
			this.stateMachine,
			this.character,
			this.keybindController,
			this.manaController,
			this.animationController,
		);
		this.CLIMB = new ClimbState(
			this.stateMachine,
			this.character,
			this.keybindController,
			this.manaController,
			this.animationController,
		);
		this.CHARGE_MANA = new ChargeManaState(
			this.stateMachine,
			this.character,
			this.keybindController,
			this.inputController,
		);

		this.stateMachine.addStates([
			this.IDLE,
			this.RUN,
			this.DASH,
			this.CLIMB,
			this.CHARGE_MANA,
		]);
		this.stateMachine.initialize(this.IDLE);
	}

	public onTick(dt: number): void {
		this.stateMachine.update(dt);
	}
}
