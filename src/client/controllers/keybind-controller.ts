import { Controller } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ContextActionService, UserInputService } from "@rbxts/services";
import { valueof } from "../../../types";

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
	toggleBackpack: Enum.KeyCode;
	slot1: Enum.KeyCode;
	slot2: Enum.KeyCode;
	slot3: Enum.KeyCode;
	slot4: Enum.KeyCode;
	slot5: Enum.KeyCode;
	slot6: Enum.KeyCode;
	slot7: Enum.KeyCode;
	slot8: Enum.KeyCode;
	slot9: Enum.KeyCode;
	slot10: Enum.KeyCode;
	slot11: Enum.KeyCode;
	slot12: Enum.KeyCode;
	drop: Enum.KeyCode;
}

const DEFAULT_KEYBINDS: Keybinds = {
	forward: Enum.KeyCode.W,
	left: Enum.KeyCode.A,
	right: Enum.KeyCode.D,
	backward: Enum.KeyCode.S,
	jump: Enum.KeyCode.Space,
	dash: Enum.KeyCode.Q,
	chargeMana: Enum.KeyCode.G,
	interact: Enum.KeyCode.E,
	lightAttack: Enum.UserInputType.MouseButton1,
	heavyAttack: Enum.UserInputType.MouseButton2,
	block: Enum.KeyCode.F,
	carry: Enum.KeyCode.V,
	grip: Enum.KeyCode.B,
	injure: Enum.KeyCode.N,
	forceFeed: Enum.KeyCode.P,
	toggleBackpack: Enum.KeyCode.Backquote,
	slot1: Enum.KeyCode.One,
	slot2: Enum.KeyCode.Two,
	slot3: Enum.KeyCode.Three,
	slot4: Enum.KeyCode.Four,
	slot5: Enum.KeyCode.Five,
	slot6: Enum.KeyCode.Six,
	slot7: Enum.KeyCode.Seven,
	slot8: Enum.KeyCode.Eight,
	slot9: Enum.KeyCode.Nine,
	slot10: Enum.KeyCode.Zero,
	slot11: Enum.KeyCode.Minus,
	slot12: Enum.KeyCode.Equals,
	drop: Enum.KeyCode.Backspace,
};

export enum InputAxis {
	Horizontal,
	Vertical,
}

type Action = (state: Enum.UserInputState) => Enum.ContextActionResult | void;

@Controller()
export class KeybindController {
	public keybinds = DEFAULT_KEYBINDS;

	public isKeyDown(action: keyof Keybinds): boolean {
		return UserInputService.IsKeyDown(
			this.keybinds[action] as Enum.KeyCode,
		);
	}

	public isDirectionalKey(key: Enum.KeyCode): boolean {
		return (
			key === this.keybinds.forward ||
			key === this.keybinds.backward ||
			key === this.keybinds.left ||
			key === this.keybinds.right
		);
	}

	public isDirectionalKeyDown(): boolean {
		return (
			UserInputService.IsKeyDown(this.keybinds.forward) ||
			UserInputService.IsKeyDown(this.keybinds.backward) ||
			UserInputService.IsKeyDown(this.keybinds.left) ||
			UserInputService.IsKeyDown(this.keybinds.right)
		);
	}

	public getKeyActionName(
		key: valueof<Keybinds>,
	): keyof Keybinds | undefined {
		for (const [actionName, actionKey] of Object.entries(this.keybinds)) {
			if (key === actionKey) return actionName;
		}
	}

	public loadKeybind(
		actionName: keyof Keybinds,
		keybind: Enum.KeyCode | Enum.UserInputType,
		action: Action,
	) {
		ContextActionService.UnbindAction(`input_${actionName}`);
		ContextActionService.BindAction(
			`input_${actionName}`,
			(_, state) => {
				action(state);
				return Enum.ContextActionResult.Pass;
			},
			false,
			keybind,
		);
	}

	public unloadKeybind(actionName: keyof Keybinds) {
		ContextActionService.UnbindAction(`input_${actionName}`);
	}

	public unloadAllKeybinds() {
		for (const actionName of Object.keys(this.keybinds)) {
			this.unloadKeybind(actionName);
		}
	}

	public changeKeybind(
		actionName: keyof Keybinds,
		newKey: valueof<Keybinds>,
		action: Action,
	) {
		this.unloadKeybind(actionName);
		this.loadKeybind(actionName, newKey, action);
	}
}
