import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Character } from "./character";

@Component({
	tag: "FallDamage",
	defaults: {
		airTime: 0,
		startHeight: 0,
	},
})
export class FallDamage extends BaseComponent<{}, Model> implements OnTick {
	airTime = 0;
	startHeight = 0;

	constructor(private character: Character) {
		super();
	}

	private calculateDamage(distance: number): number {
		return 3 * (0.07 * distance + 0.001 * math.pow(distance, 2));
	}

	onTick(dt: number): void {
		const humanoidRootPart = this.character.instance.HumanoidRootPart;
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
			const humanoid = this.character.instance.Humanoid;

			humanoid.TakeDamage(damage);
			if (damage > humanoid.MaxHealth * 0.75) {
				this.character.kill();
			}
		}
	}
}
