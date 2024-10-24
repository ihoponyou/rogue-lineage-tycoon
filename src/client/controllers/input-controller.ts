import { Components } from "@flamework/components";
import { Controller, OnStart, OnTick } from "@flamework/core";
import { UserInputService, Workspace } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { store } from "client/store";
import {
	selectMana,
	selectManaEnabled,
} from "shared/store/slices/mana/selectors";
import { OnLocalCharacterAdded } from "../../../types/lifecycles";
import { CharacterClient } from "../components/character-client";
import { InventoryController } from "./inventory-controller";
import { KeybindController } from "./keybind-controller";

const BEGIN = Enum.UserInputState.Begin;
const END = Enum.UserInputState.End;
const RUN_INTERVAL = 0.2;

export enum InputAxis {
	Horizontal,
	Vertical,
}

export type Direction = "forward" | "backward" | "left" | "right";

type ChargeManaCallback = (bool: boolean) => void;
type ClimbCallback = (wallCastResult: RaycastResult) => void;

@Controller()
export class InputController implements OnStart, OnTick, OnLocalCharacterAdded {
	private inputVector = Vector2.zero;
	private runTriggered = new Signal();
	private dashTriggered = new Signal();
	private climbTriggered = new Signal<ClimbCallback>();
	private chargeManaTriggered = new Signal<ChargeManaCallback>();
	private lightAttackTriggered = new Signal();
	private heavyAttackTriggered = new Signal();
	private blockTriggered = new Signal();

	private lastForwardInputTick = 0;
	private character?: CharacterClient;

	public constructor(
		private components: Components,
		private keybindController: KeybindController,
		private inventoryController: InventoryController,
	) {}

	public onStart(): void {
		this.keybindController.loadKeybind(
			"forward",
			this.keybindController.keybinds.forward,
			(state) => this.handleForwardInput(state),
		);
		this.keybindController.loadKeybind(
			"dash",
			this.keybindController.keybinds.dash,
			(state) => this.handleDashInput(state),
		);
		this.keybindController.loadKeybind(
			"jump",
			this.keybindController.keybinds.jump,
			(state) => this.handleJumpInput(state),
		);
		this.keybindController.loadKeybind(
			"chargeMana",
			this.keybindController.keybinds.chargeMana,
			(state) => this.handleManaInput(state),
		);
		this.keybindController.loadKeybind(
			"lightAttack",
			this.keybindController.keybinds.lightAttack,
			(state) => this.handleLightAttackInput(state),
		);
		this.keybindController.loadKeybind(
			"heavyAttack",
			this.keybindController.keybinds.heavyAttack,
			(state) => this.handleHeavyAttackInput(state),
		);
		this.keybindController.loadKeybind(
			"block",
			this.keybindController.keybinds.block,
			(state) => this.handleBlockInput(state),
		);
		this.keybindController.loadKeybind(
			"toggleBackpack",
			this.keybindController.keybinds.toggleBackpack,
			(state) => {
				if (state !== BEGIN) return;
				store.toggleBackpack();
			},
		);
		this.keybindController.loadKeybind(
			"slot1",
			this.keybindController.keybinds.slot1,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(0);
			},
		);
		this.keybindController.loadKeybind(
			"slot2",
			this.keybindController.keybinds.slot2,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(1);
			},
		);
		this.keybindController.loadKeybind(
			"slot3",
			this.keybindController.keybinds.slot3,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(2);
			},
		);
		this.keybindController.loadKeybind(
			"slot4",
			this.keybindController.keybinds.slot4,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(3);
			},
		);
		this.keybindController.loadKeybind(
			"slot5",
			this.keybindController.keybinds.slot5,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(4);
			},
		);
		this.keybindController.loadKeybind(
			"slot6",
			this.keybindController.keybinds.slot6,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(5);
			},
		);
		this.keybindController.loadKeybind(
			"slot7",
			this.keybindController.keybinds.slot7,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(6);
			},
		);
		this.keybindController.loadKeybind(
			"slot8",
			this.keybindController.keybinds.slot8,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(7);
			},
		);
		this.keybindController.loadKeybind(
			"slot9",
			this.keybindController.keybinds.slot9,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(8);
			},
		);
		this.keybindController.loadKeybind(
			"slot10",
			this.keybindController.keybinds.slot10,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(9);
			},
		);
		this.keybindController.loadKeybind(
			"slot11",
			this.keybindController.keybinds.slot11,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(10);
			},
		);
		this.keybindController.loadKeybind(
			"slot12",
			this.keybindController.keybinds.slot12,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.switchSlot(11);
			},
		);
		this.keybindController.loadKeybind(
			"drop",
			Enum.KeyCode.Backspace,
			(state) => {
				if (state !== BEGIN) return;
				this.inventoryController.dropSelectedItem();
			},
		);
	}

	public onTick(): void {
		this.inputVector = new Vector2(
			this.getAxis(InputAxis.Horizontal),
			this.getAxis(InputAxis.Vertical),
		);
	}

	public onLocalCharacterAdded(character: Model): void {
		this.components
			.waitForComponent<CharacterClient>(character)
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

	public onRunTriggered(callback: Callback): RBXScriptConnection {
		return this.runTriggered.Connect(callback);
	}

	public onChargeManaTriggered(
		callback: ChargeManaCallback,
	): RBXScriptConnection {
		return this.chargeManaTriggered.Connect(callback);
	}

	public onDashTriggered(callback: Callback): RBXScriptConnection {
		return this.dashTriggered.Connect(callback);
	}

	public onClimbTriggered(callback: ClimbCallback): RBXScriptConnection {
		return this.climbTriggered.Connect(callback);
	}

	public onLightAttackTriggered(callback: () => void): RBXScriptConnection {
		return this.lightAttackTriggered.Connect(callback);
	}

	public onBlockTriggered(callback: () => void): RBXScriptConnection {
		return this.blockTriggered.Connect(callback);
	}

	public onHeavyAttackTriggered(callback: Callback): RBXScriptConnection {
		return this.heavyAttackTriggered.Connect(callback);
	}

	public getInputVector(): Vector2 {
		return this.inputVector;
	}

	private handleForwardInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		if (tick() - this.lastForwardInputTick <= RUN_INTERVAL) {
			this.runTriggered.Fire();
		}
		this.lastForwardInputTick = tick();
		return Enum.ContextActionResult.Pass;
	}

	private handleDashInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.dashTriggered.Fire();
		return Enum.ContextActionResult.Pass;
	}

	private handleJumpInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		if (!this.character) return Enum.ContextActionResult.Pass;
		const manaData = store.getState(selectMana());
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
		const manaEnabled = store.getState(selectManaEnabled());
		if (!manaEnabled) return Enum.ContextActionResult.Pass;
		if (state === BEGIN || state === END) {
			this.chargeManaTriggered.Fire(state === BEGIN);
		}
		return Enum.ContextActionResult.Sink;
	}

	private handleLightAttackInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.lightAttackTriggered.Fire();
		// pass instead of sink to allow click detectors to function
		return Enum.ContextActionResult.Pass;
	}

	private handleBlockInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.blockTriggered.Fire();
		return Enum.ContextActionResult.Sink;
	}

	private handleHeavyAttackInput(state: Enum.UserInputState) {
		if (state !== BEGIN) return Enum.ContextActionResult.Pass;
		this.heavyAttackTriggered.Fire();
		return Enum.ContextActionResult.Sink;
	}
}
