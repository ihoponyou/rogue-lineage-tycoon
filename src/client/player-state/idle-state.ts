import { Trove } from "@rbxts/trove";
import { CharacterClient } from "client/components/character-client";
import { StateMachine } from "shared/state-machine";
import { InputController } from "../controllers/input-controller";
import { CharacterState } from "./character-state";
import {
	createAttackTransition,
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
		character: CharacterClient,
		private inputController: InputController,
	) {
		super(stateMachine, character);
	}

	public override enter(): void {
		this.transitions.add(
			createRunTransition(this.stateMachine, this.inputController),
		);
		this.transitions.add(
			createDashTransition(this.stateMachine, this.inputController),
		);
		this.transitions.add(
			createClimbTransition(this.stateMachine, this.inputController),
		);
		this.transitions.add(
			createChargeManaTransition(this.stateMachine, this.inputController),
		);
		this.transitions.add(
			createAttackTransition(
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
