import { BaseComponent, Component } from "@flamework/components";
import { OnTick } from "@flamework/core";
import { CharacterServer } from "./character-server";
import { RagdollServer } from "./ragdoll-server";

@Component({
	tag: "FallDamage",
})
export class FallDamage extends BaseComponent implements OnTick {
	private airTime = 0;
	private startHeight = 0;

	public constructor(
		private character: CharacterServer,
		private ragdoll: RagdollServer,
	) {
		super();
	}

	private calculateDamage(distance: number): number {
		return 3 * (0.07 * distance + 0.001 * math.pow(distance, 2));
	}

	public onTick(dt: number): void {
		if (!this.character.attributes.isAlive) return;
		let humanoidRootPart;
		try {
			humanoidRootPart = this.character.getHumanoidRootPart();
		} catch (e) {
			// warn(e);
			return;
		}

		const falling = humanoidRootPart.AssemblyLinearVelocity.Y < -1;

		if (falling) {
			this.airTime += dt;
		} else {
			const currentHeight = humanoidRootPart.Position.Y;
			const distanceFallen = this.startHeight - currentHeight;

			this.airTime = 0;
			this.startHeight = currentHeight;
			if (distanceFallen < 15) return;

			const damage = this.calculateDamage(distanceFallen);
			const humanoid = this.character.getHumanoid();

			humanoid.TakeDamage(damage);
			if (damage > humanoid.MaxHealth * 0.75) {
				this.character.kill();
				this.ragdoll.toggle(true);
			}
		}
	}
}
