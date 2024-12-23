import { RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { CharacterClient } from "client/components/character-client";
import { AnimationController } from "client/controllers/animation-controller";
import { KeybindController } from "client/controllers/keybind-controller";
import { Events, Functions } from "client/network";
import { getWeaponConfig, WeaponName } from "shared/configs/weapons";
import { CharacterActivity } from "./character-activity";

export class BlockActivity extends CharacterActivity {
	private blockAnimationName = "";
	private getEquippedWeaponPromise?: Promise<void>;
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

		this.getEquippedWeaponPromise =
			Functions.item.getCurrentlyEquippedWeaponInstance
				.invoke()
				.then((instance) => {
					let config = getWeaponConfig("Fists");
					if (instance !== undefined) {
						try {
							config = getWeaponConfig(
								instance?.Name as WeaponName,
							);
						} catch (e) {
							// oops!
						}
					}
					this.blockAnimationName =
						config?.blockAnimation?.Name ?? "DefaultBlock";
					this.animationController.play(this.blockAnimationName);
				})
				.catch(warn);

		this.trove.add(Events.combat.unblock.connect(() => this.stop()));

		Events.combat.block(true);

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

		this.getEquippedWeaponPromise?.cancel();
		Events.combat.block(false);
		this.animationController.stop(this.blockAnimationName);

		this.trove.clean();
	}
}
