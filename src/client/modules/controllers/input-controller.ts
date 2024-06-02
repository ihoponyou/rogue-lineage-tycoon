import { Controller, Dependency, OnStart, OnTick } from "@flamework/core";
import {
	ContextActionService,
	Players,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { KeybindController } from "./keybind-controller";
import Signal from "@rbxts/signal";
import { OnLocalCharacterAdded } from "../../../../types/lifecycles";
import { CharacterClient } from "../components/character-client";
import { Components } from "@flamework/components";

const BEGIN = Enum.UserInputState.Begin;
const END = Enum.UserInputState.End;
const RUN_INTERVAL = 0.2;

export enum InputAxis {
	Horizontal,
	Vertical,
}

export type Direction = "forward" | "backward" | "left" | "right";

@Controller()
export class InputController implements OnStart, OnTick, OnLocalCharacterAdded {
	static inputVector = new Vector2();
	readonly runTriggered = new Signal();
	readonly dashTriggered = new Signal<(direction: Direction) => void>();
	readonly climbTriggered = new Signal<
		(wallCastResult: RaycastResult) => void
	>();
	readonly chargeManaTriggered = new Signal<(bool: boolean) => void>();

	private character?: CharacterClient;
	private lastForwardInputTick = 0;

	constructor(private keybindController: KeybindController) {}

	onStart(): void {
		ContextActionService.BindAction(
			"input_forward",
			(_, state) => {
				return this.handleForwardInput(state);
			},
			false,
			this.keybindController.keybinds.forward,
		);
		ContextActionService.BindAction(
			"input_dash",
			(_, state) => {
				return this.handleDashInput(state);
			},
			true,
			this.keybindController.keybinds.dash,
		);
		ContextActionService.BindAction(
			"input_jump",
			(_, state) => {
				return this.handleJumpInput(state);
			},
			false,
			this.keybindController.keybinds.jump,
		);
		ContextActionService.BindAction(
			"input_mana",
			(_, state) => {
				return this.handleManaInput(state);
			},
			true,
			this.keybindController.keybinds.chargeMana,
		);
	}

	onTick(dt: number): void {
		InputController.inputVector = this.getInputVector();
	}

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components
			.waitForComponent<CharacterClient>(character)
			.andThen((component) => (this.character = component));
	}

	// like the old unity one
	getAxis(axis: InputAxis): 1 | 0 | -1 {
		const isRightDown = UserInputService.IsKeyDown(
			this.keybindController.keybinds.right,
		);
		const isLeftDown = UserInputService.IsKeyDown(
			this.keybindController.keybinds.left,
		);
		const isForwardDown = UserInputService.IsKeyDown(
			this.keybindController.keybinds.forward,
		);
		const isBackwardDown = UserInputService.IsKeyDown(
			this.keybindController.keybinds.backward,
		);

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
		return new Vector2(
			this.getAxis(InputAxis.Horizontal),
			this.getAxis(InputAxis.Vertical),
		);
	}

	private handleForwardInput(state: Enum.UserInputState) {
		if (state !== Enum.UserInputState.Begin)
			return Enum.ContextActionResult.Pass;
		if (tick() - this.lastForwardInputTick <= RUN_INTERVAL) {
			this.runTriggered.Fire();
		}
		this.lastForwardInputTick = tick();
		return Enum.ContextActionResult.Pass;
	}

	private handleDashInput(state: Enum.UserInputState) {
		if (state !== Enum.UserInputState.Begin)
			return Enum.ContextActionResult.Pass;

		let direction: Direction = "backward";
		if (this.keybindController.isKeyDown("forward")) {
			direction = "forward";
		} else if (this.keybindController.isKeyDown("left")) {
			direction = "left";
		} else if (this.keybindController.isKeyDown("right")) {
			direction = "right";
		}

		this.dashTriggered.Fire(direction);

		return Enum.ContextActionResult.Pass;
	}

	private handleJumpInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		if (!this.character) return Enum.ContextActionResult.Pass;

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const forwardCast = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.mul(new Vector3(2, 0, 2)),
			this.character.getRaycastParams(),
		);

		const inAir =
			this.character.instance.Humanoid.FloorMaterial ===
			Enum.Material.Air;
		if (!forwardCast || !inAir) {
			return Enum.ContextActionResult.Pass;
		}

		const castInstance = forwardCast.Instance;
		if (
			castInstance.Anchored &&
			castInstance.CanCollide &&
			!castInstance.IsA("TrussPart")
		) {
			this.climbTriggered.Fire(forwardCast);
		}
	}

	private handleManaInput(state: Enum.UserInputState) {
		if (state === BEGIN || state === END) {
			this.chargeManaTriggered.Fire(state === BEGIN);
		}
		return Enum.ContextActionResult.Pass;
	}
}
