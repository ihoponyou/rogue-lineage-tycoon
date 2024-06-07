import { Component } from "@flamework/components";
import { CharacterClient } from "./character-client";
import { DisposableComponent } from "shared/modules/components/disposable-component";
import { OnStart, OnTick } from "@flamework/core";
import { StateMachine } from "shared/modules/state-machine";
import { IdleState } from "../player-state/idle-state";
import { RunState } from "../player-state/run-state";
import { DashState } from "../player-state/dash-state";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { ManaController } from "../controllers/mana-controller";
import { AnimationController } from "../controllers/animation-controller";
import { ClimbState } from "../player-state/climb-state";
import { ChargeManaState } from "../player-state/charge-mana-state";

@Component()
export class CharacterStateMachine
	extends DisposableComponent<{}, Instance>
	implements OnStart, OnTick
{
	private stateMachine = new StateMachine();
	private IDLE: IdleState;
	private RUN: RunState;
	private DASH: DashState;
	private CLIMB: ClimbState;
	private CHARGE_MANA: ChargeManaState;

	constructor(
		private character: CharacterClient,
		private inputController: InputController,
		private keybindController: KeybindController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super();

		this.IDLE = new IdleState(this.stateMachine, inputController);
		this.RUN = new RunState(
			this.stateMachine,
			character,
			keybindController,
			inputController,
			manaController,
			animationController,
		);
		this.DASH = new DashState(
			this.stateMachine,
			character,
			keybindController,
			manaController,
			animationController,
		);
		this.CLIMB = new ClimbState(
			this.stateMachine,
			character,
			keybindController,
			manaController,
			animationController,
		);
		this.CHARGE_MANA = new ChargeManaState(
			this.stateMachine,
			character,
			keybindController,
			inputController,
		);

		this.stateMachine.addStates([
			this.IDLE,
			this.RUN,
			this.DASH,
			this.CLIMB,
			this.CHARGE_MANA,
		]);
	}

	onStart(): void {
		this.stateMachine.initialize(this.IDLE);
	}

	onTick(dt: number): void {
		this.stateMachine.update(dt);
	}
}
