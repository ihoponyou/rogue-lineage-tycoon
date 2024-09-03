import { Trove } from "@rbxts/trove";
import { Events } from "client/network";
import { store } from "client/store";
import { selectActiveTool } from "client/store/slices/gui/selectors";
import { BLOCK_WALK_SPEED } from "shared/configs";
import { getWeaponConfig, WeaponConfig } from "shared/configs/weapons";
import { StateMachine } from "shared/modules/state-machine";
import { Character } from "../components/character";
import { AnimationController } from "../controllers/animation-controller";
import { KeybindController } from "../controllers/keybind-controller";
import { CharacterState } from "./character-state";

export class BlockState extends CharacterState {
	public readonly name = "Block";

	private blockAnimationName = "";
	private trove = new Trove();

	public constructor(
		stateMachine: StateMachine,
		character: Character,
		private keybindController: KeybindController,
		private animationController: AnimationController,
	) {
		super(stateMachine, character);
	}

	public override enter(): void {
		const equippedTool = store.getState(selectActiveTool());
		let config: WeaponConfig | undefined;
		if (equippedTool !== undefined) {
			try {
				config = getWeaponConfig(equippedTool?.Name);
			} catch (e) {
				// oops!
			}
		}
		this.blockAnimationName =
			config?.blockAnimation?.Name ?? "DefaultBlock";
		this.animationController.play(this.blockAnimationName);
		this.character.setWalkSpeed(BLOCK_WALK_SPEED);

		Events.combat.block(true);

		this.trove.add(
			Events.combat.unblock.connect(() =>
				this.stateMachine.transitionTo("idle"),
			),
		);

		this.trove.add(
			Events.combat.blockHit.connect(() => {
				this.animationController.play(`BlockHit${math.random(1, 3)}`);
			}),
		);
	}

	public override update(): void {
		if (!this.keybindController.isKeyDown("block")) {
			this.stateMachine.transitionTo("idle");
			Events.combat.block(false);
		}
	}

	public override exit(): void {
		this.animationController.stop(this.blockAnimationName);
		this.character.resetWalkSpeed();

		this.trove.clean();
	}
}
