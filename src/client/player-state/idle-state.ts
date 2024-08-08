import { Trove } from "@rbxts/trove";
import { Character } from "client/components/character";
import { StateMachine } from "shared/modules/state-machine";
import { InputController } from "../controllers/input-controller";
import { CharacterState } from "./character-state";
import {
	createAttackTransition,
	createBlockTransition,
	createChargeManaTransition,
	createClimbTransition,
	createDashTransition,
	createRunTransition,
} from "./transitions";

export class IdleState extends CharacterState {
	public readonly name = "Idle";

	private transitions = new Trove();

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private inputController: InputController,
	) {
		super(stateMachine, character);
	}

	public override enter(): void {
		this.transitions.add(
			createRunTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
		this.transitions.add(
			createDashTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
		this.transitions.add(
			createClimbTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
		this.transitions.add(
			createChargeManaTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
		this.transitions.add(
			createAttackTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
		this.transitions.add(
			createBlockTransition(
				this.stateMachine,
				this.inputController,
				this.character,
			),
		);
	}

	public override exit(): void {
		this.transitions.clean();
	}
}
