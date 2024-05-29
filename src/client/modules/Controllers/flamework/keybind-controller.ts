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

export interface Keybinds {
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
}

export enum InputAxis {
	Horizontal,
	Vertical		
}

type Action = (state: Enum.UserInputState) => Enum.ContextActionResult | void;

@Controller()
export class KeybindController {
	private lastForwardInputTick = 0;
	
	keybinds = DEFAULT_KEYBINDS;

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

	isKeyDown(action: keyof Keybinds): boolean {
		return UserInputService.IsKeyDown(this.keybinds[action] as Enum.KeyCode);
	}

	isDirectionalKey(key: Enum.KeyCode): boolean {
		return key === this.keybinds.forward ||
			key === this.keybinds.backward ||
			key === this.keybinds.left ||
			key === this.keybinds.right;
	}

	isDirectionalKeyDown(): boolean {
		return UserInputService.IsKeyDown(this.keybinds.forward) ||
			UserInputService.IsKeyDown(this.keybinds.backward) ||
			UserInputService.IsKeyDown(this.keybinds.left) ||
			UserInputService.IsKeyDown(this.keybinds.right);
	}

	getKeyActionName(key: valueof<Keybinds>): keyof Keybinds | undefined {
		for (const [actionName, actionKey] of Object.entries(this.keybinds)) {
			if (key === actionKey) return actionName;
		}
	}

	loadKeybind(actionName: keyof Keybinds, keybind: valueof<Keybinds>, action: Action) {
		ContextActionService.BindAction(
			`input_${actionName}`,
			(_, state) => {
				action(state)
				return Enum.ContextActionResult.Pass;
			},
			false,
			keybind
		)
	}

	unloadKeybind(actionName: keyof Keybinds) {
		ContextActionService.UnbindAction(`input_${actionName}`);
	}

	unloadAllKeybinds() {
		for (const actionName of Object.keys(this.keybinds)) {
			this.unloadKeybind(actionName);
		}
	}

	changeKeybind(actionName: keyof Keybinds, newKey: valueof<Keybinds>, action: Action) {
		this.unloadKeybind(actionName);
		this.loadKeybind(actionName, newKey, action);
	}
}