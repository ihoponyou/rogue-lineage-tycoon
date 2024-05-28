import { Controller, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ContextActionService, UserInputService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { valueof } from "../../../../../types/valueof";

const RUN_INPUT_INTERVAL = 0.2;

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

@Controller()
export class InputController implements OnStart {
	private lastW = 0;
	private trove = new Trove();
	
	keybinds = DEFAULT_KEYBINDS;

	onStart(): void {
		
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

	isMovementKeyDown(): boolean {
		return UserInputService.IsKeyDown(this.keybinds.forward) || UserInputService.IsKeyDown(this.keybinds.backward) || UserInputService.IsKeyDown(this.keybinds.left) || UserInputService.IsKeyDown(this.keybinds.right);	
	}

	loadKeybind(action: keyof Keybinds, keybind: valueof<Keybinds>) {
		ContextActionService.BindAction(
			`input_${action}`,
			(actionName, state, inputObject) => this[action](state),
			false,
			keybind
		)
	}

	forward(state: Enum.UserInputState) {}
	left(state: Enum.UserInputState) {}
	right(state: Enum.UserInputState) {}
	backward(state: Enum.UserInputState) {}
	jump(state: Enum.UserInputState) {}
	dash(state: Enum.UserInputState) {}
	chargeMana(state: Enum.UserInputState) {}
	interact(state: Enum.UserInputState) {}
	lightAttack(state: Enum.UserInputState) {}
	heavyAttack(state: Enum.UserInputState) {}
	block(state: Enum.UserInputState) {}
	carry(state: Enum.UserInputState) {}
	grip(state: Enum.UserInputState) {}
	injure(state: Enum.UserInputState) {}
	forceFeed(state: Enum.UserInputState) {}
}