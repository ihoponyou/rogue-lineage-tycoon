import { CharacterState } from "./character-state";
import { StateMachine } from "shared/modules/state-machine";
import { CharacterClient } from "../components/character-client";
import { InputController } from "../controllers/input-controller";
import { UserInputService } from "@rbxts/services";

export class RunState extends CharacterState {
	readonly name = "Run";

	private dashConnection?: RBXScriptConnection;

	constructor(
		stateMachine: StateMachine,
		character: CharacterClient,
		private inputController: InputController,
	) {
		super(stateMachine, character);
	}

	enter(...args: Array<unknown>): void {
		const humanoid = this.character.instance.Humanoid;
		humanoid.WalkSpeed = 24;
		this.dashConnection = this.inputController.dashTriggered.Connect(() => {
			this.stateMachine.transitionTo("dash");
		});
	}

	update(deltaTime: number): void {
		if (!UserInputService.IsKeyDown(Enum.KeyCode.W))
			this.stateMachine.transitionTo("idle");
	}

	exit(): void {
		const humanoid = this.character.instance.Humanoid;
		humanoid.WalkSpeed = 16;
		if (this.dashConnection) this.dashConnection.Disconnect();
	}
}
