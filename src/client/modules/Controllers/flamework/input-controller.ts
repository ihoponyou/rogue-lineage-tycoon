import { Controller, OnStart, OnTick } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ContextActionService, UserInputService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { valueof } from "../../../../../types/valueof";
import { ManaController } from "./mana-controller";
import { Direction, MovementController } from "./movement-controller";
import { KeybindController } from "./keybind-controller";

const RUN_INPUT_INTERVAL = 0.2;
const BEGIN = Enum.UserInputState.Begin;
const END = Enum.UserInputState.End;

export enum InputAxis {
	Horizontal,
	Vertical		
}

@Controller()
export class InputController implements OnStart, OnTick {
	private lastForwardInputTick = 0;

	static inputVector = new Vector2();

	constructor(
		private manaController: ManaController,
		private movementController: MovementController,
		private keybindController: KeybindController
	) {}

	onStart(): void {
		for (const [action, key] of Object.entries(this.keybindController.keybinds)) {
			this.keybindController.loadKeybind(
				action,
				key,
				(state) => {
					return this[action](state);
				}
			);
		}
	}

	onTick(dt: number): void {
		InputController.inputVector = this.getInputVector();
	}

	// like the old unity one
	getAxis(axis: InputAxis): 1 | 0 | -1 {
		const isRightDown = UserInputService.IsKeyDown(this.keybindController.keybinds.right);
		const isLeftDown = UserInputService.IsKeyDown(this.keybindController.keybinds.left);
		const isForwardDown = UserInputService.IsKeyDown(this.keybindController.keybinds.forward);
		const isBackwardDown = UserInputService.IsKeyDown(this.keybindController.keybinds.backward);

		if (axis === InputAxis.Horizontal) {
			if (isRightDown && isLeftDown) return 0;
			else if (isRightDown) return 1;
			else if (isLeftDown) return -1;
			else return 0;
		} else {
			if (isForwardDown && isBackwardDown) return 0;
			else if (isForwardDown) return 1;
			else if (isBackwardDown) return -1;
			else return 0;
		}
	}

	getInputVector(): Vector2 {
		return new Vector2(this.getAxis(InputAxis.Horizontal), this.getAxis(InputAxis.Vertical));
	}

	forward(state: Enum.UserInputState) {
		if (state === BEGIN) {
			const now = tick();
			if (now - this.lastForwardInputTick < RUN_INPUT_INTERVAL) {
				this.movementController.startRun();
			}
			this.lastForwardInputTick = now;
		} else if (state === END) {
			this.movementController.stopRun();
		}
	}

	left(state: Enum.UserInputState) {}
	right(state: Enum.UserInputState) {}
	backward(state: Enum.UserInputState) {}

	jump(state: Enum.UserInputState) {
		if (state === BEGIN)
			this.movementController.handleJump();
	}
	
	dash(state: Enum.UserInputState) {
		if (state !== BEGIN) return;

		let direction: Direction = "backward";
		if (this.keybindController.isKeyDown("forward")) {
			direction = "forward";
		} else if (this.keybindController.isKeyDown("left")) {
			direction = "left";
		} else if (this.keybindController.isKeyDown("right")) {
			direction = "right";
		}

		this.movementController.startDodge(false, direction);
	}
	
	chargeMana(state: Enum.UserInputState) {
		this.manaController.onChargeManaInput(state);
	}

	lightAttack(state: Enum.UserInputState) {
		
	}
	
	heavyAttack(state: Enum.UserInputState) {
		
	}

	block(state: Enum.UserInputState) {
		
	}

	// these are handled by components (as of writing)
	interact(state: Enum.UserInputState) {}
	carry(state: Enum.UserInputState) {}
	grip(state: Enum.UserInputState) {}
	injure(state: Enum.UserInputState) {}
	forceFeed(state: Enum.UserInputState) {}
}