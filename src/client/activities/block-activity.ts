import { RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { CharacterClient } from "client/components/character-client";
import { AnimationController } from "client/controllers/animation-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { Events } from "client/network";
import { BLOCK_WALK_SPEED } from "shared/configs";
import { WeaponConfig } from "shared/configs/weapons";
import { CharacterActivity } from "./character-activity";

export class BlockActivity extends CharacterActivity {
	private blockAnimationName = "";
	private trove = new Trove();

	public constructor(
		character: CharacterClient,
		private animationController: AnimationController,
		private keybindController: KeybindController,
	) {
		super(character);
	}

	public override start(): void {
		super.start();

		const equippedTool = undefined; //store.getState(selectActiveEquippable());
		let config: WeaponConfig | undefined;
		if (equippedTool !== undefined) {
			try {
				warn("fix me");
				// config = getWeaponConfig(equippedTool?.Name);
			} catch (e) {
				// oops!
			}
		}
		this.blockAnimationName =
			config?.blockAnimation?.Name ?? "DefaultBlock";
		this.animationController.play(this.blockAnimationName);
		this.character.setWalkSpeed(BLOCK_WALK_SPEED);

		Events.combat.block(true);

		this.trove.add(Events.combat.unblock.connect(() => this.stop()));

		this.trove.add(
			Events.combat.blockHit.connect(() => {
				this.animationController.play(`BlockHit${math.random(1, 3)}`);
			}),
		);

		this.trove.connect(RunService.RenderStepped, () => {
			if (this.keybindController.isKeyDown("block")) return;
			this.stop();
		});
	}

	public override stop(): void {
		super.stop();

		Events.combat.block(false);
		this.animationController.stop(this.blockAnimationName);
		this.character.resetWalkSpeed();

		this.trove.clean();
	}
}
