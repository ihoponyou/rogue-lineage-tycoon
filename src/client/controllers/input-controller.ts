import { Components } from "@flamework/components";
import { Controller, Dependency, OnStart, OnTick } from "@flamework/core";
import {
	ContextActionService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import Signal from "@rbxts/signal";
import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import {
	selectMana,
	selectManaEnabled,
} from "shared/store/slices/players/slices/mana/selectors";
import { OnLocalCharacterAdded } from "../../../types/lifecycles";
import { Character } from "../components/character";
import { KeybindController } from "./keybind-controller";

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
	public static inputVector = new Vector2();
	public readonly runTriggered = new Signal();
	public readonly dashTriggered = new Signal<
		(direction: Direction) => void
	>();
	public readonly climbTriggered = new Signal<
		(wallCastResult: RaycastResult) => void
	>();
	public readonly chargeManaTriggered = new Signal<(bool: boolean) => void>();

	private character?: Character;
	private lastForwardInputTick = 0;
	private lightAttackTriggered = new Signal();
	private blockTriggered = new Signal();

	public constructor(private keybindController: KeybindController) {}

	public onStart(): void {
		ContextActionService.BindAction(
			"input_forward",
			(_, state) => this.handleForwardInput(state),
			false,
			this.keybindController.keybinds.forward,
		);
		ContextActionService.BindAction(
			"input_dash",
			(_, state) => this.handleDashInput(state),
			true,
			this.keybindController.keybinds.dash,
		);
		ContextActionService.BindAction(
			"input_jump",
			(_, state) => this.handleJumpInput(state),
			false,
			this.keybindController.keybinds.jump,
		);
		ContextActionService.BindAction(
			"input_mana",
			(_, state) => this.handleManaInput(state),
			true,
			this.keybindController.keybinds.chargeMana,
		);
		ContextActionService.BindAction(
			"input_light_attack",
			(_, state) => this.handleLightAttackInput(state),
			true,
			this.keybindController.keybinds.lightAttack,
		);
		ContextActionService.BindAction(
			"input_block",
			(_, state) => this.handleBlockInput(state),
			true,
			this.keybindController.keybinds.block,
		);
	}

	public onTick(): void {
		InputController.inputVector = this.getInputVector();
	}

	public onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components
			.waitForComponent<Character>(character)
			.andThen((component) => (this.character = component));
	}

	// like the old unity one
	public getAxis(axis: InputAxis): 1 | 0 | -1 {
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

	public getInputVector(): Vector2 {
		return new Vector2(
			this.getAxis(InputAxis.Horizontal),
			this.getAxis(InputAxis.Vertical),
		);
	}

	public onLightAttackTriggered(callback: () => void): RBXScriptConnection {
		return this.lightAttackTriggered.Connect(callback);
	}

	public onBlockTriggered(callback: () => void): RBXScriptConnection {
		return this.blockTriggered.Connect(callback);
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
		const manaData = store.getState(selectMana(LOCAL_PLAYER.UserId));
		if ((manaData?.amount ?? 0) <= 0 || !manaData?.climbEnabled)
			return Enum.ContextActionResult.Pass;

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const forwardCast = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.mul(new Vector3(2, 0, 2)),
			this.character.getRaycastParams(),
		);

		const inAir =
			this.character.getHumanoid().FloorMaterial === Enum.Material.Air;
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
		const manaEnabled = store.getState(
			selectManaEnabled(LOCAL_PLAYER.UserId),
		);
		if (!manaEnabled) return Enum.ContextActionResult.Pass;
		if (state === BEGIN || state === END) {
			this.chargeManaTriggered.Fire(state === BEGIN);
		}
		return Enum.ContextActionResult.Sink;
	}

	private handleLightAttackInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.lightAttackTriggered.Fire();
		return Enum.ContextActionResult.Pass;
	}

	private handleBlockInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.blockTriggered.Fire();
		return Enum.ContextActionResult.Sink;
	}
}
