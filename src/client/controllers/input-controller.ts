import { Components } from "@flamework/components";
import { Controller, OnStart, OnTick } from "@flamework/core";
import {
	ContextActionService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import Signal from "@rbxts/signal";
import { Events } from "client/network";
import { store } from "client/store";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { MAX_HOTBAR_SLOTS } from "shared/configs/constants";
import { selectSkills } from "shared/store/slices/skills/selectors";
import { CharacterController } from "./character-controller";
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

const SLOT_KEYS: Array<Enum.KeyCode> = [
	Enum.KeyCode.One,
	Enum.KeyCode.Two,
	Enum.KeyCode.Three,
	Enum.KeyCode.Four,
	Enum.KeyCode.Five,
	Enum.KeyCode.Six,
	Enum.KeyCode.Seven,
	Enum.KeyCode.Eight,
	Enum.KeyCode.Nine,
	Enum.KeyCode.Zero,
	Enum.KeyCode.Minus,
	Enum.KeyCode.Equals,
];

@Controller()
export class InputController implements OnStart, OnTick {
	private inputVector = Vector2.zero;
	private runTriggered = new Signal();
	private dashTriggered = new Signal();
	private climbTriggered = new Signal<ClimbCallback>();
	private chargeManaTriggered = new Signal<ChargeManaCallback>();
	private lightAttackTriggered = new Signal();
	private heavyAttackTriggered = new Signal();
	private blockTriggered = new Signal();

	private lastForwardInputTick = 0;

	public constructor(
		private components: Components,
		private keybindController: KeybindController,
		private characterController: CharacterController,
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
				if (state !== BEGIN) return Enum.ContextActionResult.Pass;
				const currentlyOpen = store.getState(selectIsBackpackOpen());
				store.toggleBackpackOpen(!currentlyOpen);
				return Enum.ContextActionResult.Pass;
			},
		);

		this.keybindController.loadKeybind(
			"drop",
			Enum.KeyCode.Backspace,
			(state) => {
				if (state !== BEGIN) return;
				error("fix me");
				// this.inventoryController.dropSelectedItem();
			},
		);

		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			ContextActionService.BindAction(
				`switch_slot_${i}`,
				(_, inputState) => {
					if (inputState !== Enum.UserInputState.Begin)
						return Enum.ContextActionResult.Pass;
					const character = this.characterController.getCharacter();
					if (character === undefined)
						return Enum.ContextActionResult.Pass;

					const state = store.getState();
					const equippableIdAtSlot = state.hotbar[i];
					if (equippableIdAtSlot === "")
						return Enum.ContextActionResult.Pass;

					const equippable =
						state.equippables.get(equippableIdAtSlot);
					if (equippable?.isEquipped()) {
						equippable.unequip(character);
					} else {
						equippable?.equip(character);
					}
				},
				false,
				SLOT_KEYS[i],
			);
		}

		this.keybindController.loadKeybind(
			"carry",
			this.keybindController.keybinds.carry,
			(state) => {
				if (state !== BEGIN) return;
				Events.combat.carryInput();
			},
		);
	}

	public onTick(): void {
		this.inputVector = new Vector2(
			this.getAxis(InputAxis.Horizontal),
			this.getAxis(InputAxis.Vertical),
		);
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
		const character = this.characterController.getCharacter();
		if (character === undefined) return Enum.ContextActionResult.Pass;
		const playerState = store.getState();
		if (
			(playerState?.mana.amount ?? 0) <= 0 ||
			!playerState.skills.has("Mana Climb")
		)
			return Enum.ContextActionResult.Pass;

		const humanoidRootPart = character.getHumanoidRootPart();
		const forwardCast = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.mul(new Vector3(2, 0, 2)),
			character.getRaycastParams(),
		);

		const inAir =
			character.getHumanoid().FloorMaterial === Enum.Material.Air;
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
		const manaEnabled = store.getState(selectSkills()).has("Mana");
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
