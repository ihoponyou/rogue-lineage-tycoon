import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { AttackState } from "client/player-state/attack-state";
import { BlockState } from "client/player-state/block-state";
import { StateMachine } from "shared/modules/state-machine";
import { AnimationController } from "../controllers/animation-controller";
import { InputController } from "../controllers/input-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { ChargeManaState } from "../player-state/charge-mana-state";
import { ClimbState } from "../player-state/climb-state";
import { DashState } from "../player-state/dash-state";
import { IdleState } from "../player-state/idle-state";
import { RunState } from "../player-state/run-state";
import { Character } from "./character";

@Component({
	tag: "CharacterStateMachine",
})
export class CharacterStateMachine
	extends BaseComponent<{}, Model>
	implements OnStart, OnTick
{
	private stateMachine = new StateMachine();

	public constructor(
		private character: Character,
		private inputController: InputController,
		private keybindController: KeybindController,
		private animationController: AnimationController,
	) {
		super();
	}

	public onStart(): void {
		const idle = new IdleState(
			this.stateMachine,
			this.character,
			this.inputController,
		);
		this.stateMachine.addStates([
			idle,
			new RunState(
				this.stateMachine,
				this.character,
				this.keybindController,
				this.inputController,
				this.animationController,
			),
			new DashState(
				this.stateMachine,
				this.character,
				this.animationController,
			),
			new ClimbState(
				this.stateMachine,
				this.character,
				this.keybindController,
				this.animationController,
			),
			new ChargeManaState(
				this.stateMachine,
				this.character,
				this.keybindController,
				this.inputController,
			),
			new AttackState(
				this.stateMachine,
				this.character,
				this.animationController,
			),
			new BlockState(
				this.stateMachine,
				this.character,
				this.keybindController,
				this.animationController,
			),
		]);
		this.stateMachine.initialize(idle);
	}

	public onTick(dt: number): void {
		this.stateMachine.update(dt);
	}

	public override destroy(): void {
		this.stateMachine.destroy();
		super.destroy();
	}
}
