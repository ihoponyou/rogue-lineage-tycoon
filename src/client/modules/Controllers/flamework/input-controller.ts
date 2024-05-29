import { Controller, OnStart, OnTick } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ContextActionService, UserInputService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { valueof } from "../../../../../types/valueof";
import { ManaController } from "./mana-controller";
import { Direction, MovementController } from "./movement-controller";

const RUN_INPUT_INTERVAL = 0.2;
const BEGIN = Enum.UserInputState.Begin;
const END = Enum.UserInputState.End;

interface Keybinds {
	forward: Enum.KeyCode;
	left: Enum.KeyCode;
	right: Enum.KeyCode;
	backward: Enum.KeyCode;
	jump: Enum.KeyCode;
	dash: Enum.KeyCode;
	chargeMana: Enum.KeyCode;
	interact: Enum.KeyCode;
	lightAttack: Enum.UserInputType;
	heavyAttack: Enum.UserInputType;
	block: Enum.KeyCode;
	carry: Enum.KeyCode;
	grip: Enum.KeyCode;
	injure: Enum.KeyCode;
	forceFeed: Enum.KeyCode;
	resetKeybindsToDefault : Enum.KeyCode.RightBracket,
}

const DEFAULT_KEYBINDS: Keybinds = {
	forward 	: Enum.KeyCode.W,
	left 		: Enum.KeyCode.A,
	right 		: Enum.KeyCode.D,
	backward 	: Enum.KeyCode.S,
	jump 		: Enum.KeyCode.Space,
	dash 		: Enum.KeyCode.Q,
	chargeMana 	: Enum.KeyCode.G,
	interact	: Enum.KeyCode.E,
	lightAttack : Enum.UserInputType.MouseButton1,
	heavyAttack : Enum.UserInputType.MouseButton2,
	block 		: Enum.KeyCode.F,
	carry		: Enum.KeyCode.V,
	grip		: Enum.KeyCode.B,
	injure		: Enum.KeyCode.N,
	forceFeed	: Enum.KeyCode.P,
	resetKeybindsToDefault : Enum.KeyCode.RightBracket,
}

export enum InputAxis {
	Horizontal,
	Vertical		
}

@Controller()
export class InputController implements OnStart, OnTick {
	private lastForwardInputTick = 0;
	
	keybinds = DEFAULT_KEYBINDS;

	static inputVector = new Vector2();

	constructor(
		private manaController: ManaController,
		private movementController: MovementController
	) {}

	onStart(): void {
		this.loadAllKeybinds();
	}

	onTick(dt: number): void {
		InputController.inputVector = this.getInputVector();
	}

	// like the old unity one
	getAxis(axis: InputAxis): 1 | 0 | -1 {
		const isRightDown = UserInputService.IsKeyDown(this.keybinds.right);
		const isLeftDown = UserInputService.IsKeyDown(this.keybinds.left);
		const isForwardDown = UserInputService.IsKeyDown(this.keybinds.forward);
		const isBackwardDown = UserInputService.IsKeyDown(this.keybinds.backward);

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

	isMovementKeyDown(): boolean {
		return UserInputService.IsKeyDown(this.keybinds.forward) || UserInputService.IsKeyDown(this.keybinds.backward) || UserInputService.IsKeyDown(this.keybinds.left) || UserInputService.IsKeyDown(this.keybinds.right);	
	}

	isKeyDown(action: keyof Keybinds) {
		return UserInputService.IsKeyDown(this.keybinds[action] as Enum.KeyCode);
	}

	loadKeybind(action: keyof Keybinds, keybind: valueof<Keybinds>) {
		ContextActionService.BindAction(
			`input_${action}`,
			(actionName, state, inputObject) => {
				this[action](state)
				return Enum.ContextActionResult.Pass;
			},
			false,
			keybind
		)
	}

	loadAllKeybinds() {
		for (const [action, key] of Object.entries(this.keybinds)) {
			this.loadKeybind(action, key);
		}
	}

	unloadKeybind(action: keyof Keybinds) {
		ContextActionService.UnbindAction(`input_${action}`);
	}

	unloadAllKeybinds() {
		for (const action of Object.keys(this.keybinds)) {
			this.unloadKeybind(action);
		}
	}

	resetKeybindsToDefault() {
		this.unloadAllKeybinds();
		for (const [action, key] of Object.entries(DEFAULT_KEYBINDS)) {
			this.loadKeybind(action, key);
		}
	}

	changeKeybind(action: keyof Keybinds, newKey: valueof<Keybinds>) {
		this.unloadKeybind(action);
		this.loadKeybind(action, newKey);
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
		if (this.isKeyDown("forward")) {
			direction = "forward";
		} else if (this.isKeyDown("left")) {
			direction = "left";
		} else if (this.isKeyDown("right")) {
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