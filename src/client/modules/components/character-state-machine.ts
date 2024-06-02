import { BaseComponent, Component } from "@flamework/components";
import {
	CharacterAttributes,
	CharacterInstance,
} from "shared/modules/components/character";
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

// TODO: only for local player
@Component({
	tag: "Character",
})
export class CharacterStateMachine
	extends DisposableComponent<{}, CharacterInstance>
	implements OnStart, OnTick
{
	private stateMachine = new StateMachine();
	private IDLE: IdleState;
	private RUN: RunState;
	private DASH: DashState;

	constructor(
		private character: CharacterClient,
		private inputController: InputController,
		private keybindController: KeybindController,
		private manaController: ManaController,
		private animationController: AnimationController,
	) {
		super();

		this.IDLE = new IdleState(this.stateMachine, this.inputController);
		this.RUN = new RunState(
			this.stateMachine,
			this.character,
			this.inputController,
		);
		this.DASH = new DashState(
			this.stateMachine,
			this.character,
			this.keybindController,
			this.manaController,
			this.animationController,
		);
	}

	onStart(): void {
		this.stateMachine.addStates([this.IDLE, this.RUN, this.DASH]);
		this.stateMachine.initialize(this.IDLE);
	}

	onTick(dt: number): void {
		this.stateMachine.update(dt);
	}
}
