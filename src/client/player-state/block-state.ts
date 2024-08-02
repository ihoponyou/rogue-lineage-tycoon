import { Trove } from "@rbxts/trove";
import { BLOCK_WALK_SPEED } from "shared/configs";
import { StateMachine } from "shared/state-machine";
import { Character } from "../components/character";
import { AnimationController } from "../controllers/animation-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { CharacterState } from "./character-state";

export class BlockState extends CharacterState {
	public readonly name = "Block";

	private trove = new Trove();

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private keybindController: KeybindController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override enter(): void {
		this.animationController.play("DefaultBlock");
		this.character.setWalkSpeed(BLOCK_WALK_SPEED);
	}

	public override update(): void {
		if (!this.keybindController.isKeyDown("block"))
			this.stateMachine.transitionTo("idle");
	}

	public override exit(): void {
		this.animationController.stop("DefaultBlock");
		this.character.resetWalkSpeed();

		this.trove.clean();
	}
}
