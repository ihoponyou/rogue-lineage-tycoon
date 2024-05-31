import { Controller, Dependency, OnStart, OnTick } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { UserInputService, Workspace } from "@rbxts/services";
import { ManaController } from "./mana-controller";
import { Direction, MovementController } from "./movement-controller";
import { KeybindController } from "./keybind-controller";
import { StateController } from "./state-controller";
import { CharacterClient as Character } from "../components/character-client";
import { Components } from "@flamework/components";
import { OnLocalCharacterAdded } from "../../../../types/lifecycles";

const BEGIN = Enum.UserInputState.Begin;
const END = Enum.UserInputState.End;

export enum InputAxis {
	Horizontal,
	Vertical,
}

@Controller()
export class InputController implements OnStart, OnTick, OnLocalCharacterAdded {
	private character?: Character;
	private lastForwardInputTick = 0;

	static inputVector = new Vector2();

	constructor(
		// private manaController: ManaController,
		// private movementController: MovementController,
		private keybindController: KeybindController,
		// private stateController: StateController,
	) {}

	onStart(): void {
		// for (const [action, key] of Object.entries(
		// 	this.keybindController.keybinds,
		// )) {
		// 	this.keybindController.loadKeybind(action, key, (state) => {
		// 		return this[action](state);
		// 	});
		// }
	}

	onTick(dt: number): void {
		InputController.inputVector = this.getInputVector();
	}

	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components
			.waitForComponent<Character>(character)
			.andThen((component) => {
				this.character = component;
			});
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

	// forward(state: Enum.UserInputState) {
	// 	if (state === BEGIN) {
	// 		const now = tick();
	// 		if (now - this.lastForwardInputTick < RUN_INPUT_INTERVAL) {
	// 			// this.movementController.startRun(this.manaController.hasMana());
	// 			this.stateController.run();
	// 		}
	// 		this.lastForwardInputTick = now;
	// 	} else if (
	// 		state === END &&
	// 		this.stateController.currentState() === this.stateController.RUN
	// 	) {
	// 		this.stateController.idle();
	// 	}
	// }

	left(state: Enum.UserInputState) {}
	right(state: Enum.UserInputState) {}
	backward(state: Enum.UserInputState) {}

	jump(state: Enum.UserInputState) {
		if (state === END) return;
		if (!this.character) return;

		// if (
		// this.stateController.currentState() === this.stateController.CLIMB
		// ) {
		// this.stateController.idle();
		// 	return;
		// }

		const humanoidRootPart = this.character.getHumanoidRootPart();
		const forwardCast = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.mul(new Vector3(2, 0, 2)),
			this.character.getRaycastParams(),
		);

		const inAir =
			this.character.instance.Humanoid.FloorMaterial ===
			Enum.Material.Air;
		if (forwardCast && inAir) {
			const castInstance = forwardCast.Instance;
			if (
				castInstance.Anchored &&
				castInstance.CanCollide &&
				!castInstance.IsA("TrussPart")
			) {
				// this.startClimb(forwardCast);
				// this.stateController.climb(forwardCast);
			}
		}
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

		// this.movementController.startDash(
		// 	this.manaController.hasMana(),
		// 	direction,
		// );
		// this.stateController.dash(direction);
	}

	chargeMana(state: Enum.UserInputState) {
		// if (
		// 	this.movementController.isClimbing ||
		// 	this.movementController.isDodging
		// )
		// 	return;
		// this.manaController.onChargeManaInput(state);
		// if (state === BEGIN) {
		// 	this.movementController.stopRun();
		// }
	}

	lightAttack(state: Enum.UserInputState) {}

	heavyAttack(state: Enum.UserInputState) {}

	block(state: Enum.UserInputState) {}

	// these are handled by components (as of writing)
	interact(state: Enum.UserInputState) {}
	carry(state: Enum.UserInputState) {}
	grip(state: Enum.UserInputState) {}
	injure(state: Enum.UserInputState) {}
	forceFeed(state: Enum.UserInputState) {}
}
