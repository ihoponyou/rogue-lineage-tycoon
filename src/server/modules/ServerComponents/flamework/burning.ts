import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { setInterval } from "@rbxts/set-timeout";
import { Character } from "./character";
import { Players, TweenService } from "@rbxts/services";
import { OnRemoved } from "../../../../../types/lifecycles";
import { DisposableComponent } from "shared/modules/components/disposable-component";

const HEAT_AMOUNT = 1.5;
const BURN_DAMAGE = 6;
const BURN_INTERVAL = 0.5;
const TICKS_TO_DIE = 8;

@Component({
	tag: "Burning",
})
export class Burning
	extends DisposableComponent<{}, Model>
	implements OnStart, OnRemoved
{
	private killTicks = 0;
	private cleanupBurnInterval() {}

	constructor(private character: Character) {
		super();
	}

	onStart(): void {
		const torso = this.character.getTorso();
		torso.OrangeFire.Enabled = true;
		torso.Burning.Play();

		this.trove.add(setInterval(() => this.burn(), BURN_INTERVAL));
	}

	override onRemoved(): void {
		super.onRemoved();
		this.extinguish();
	}

	burn(): void {
		if (this.character.attributes.isKnocked) this.killTicks++;
		else this.killTicks = 0;

		if (this.killTicks >= TICKS_TO_DIE) {
			this.character.instance.GetChildren().forEach((value) => {
				if (value.IsA("BasePart")) this.incineratePart(value);
				else if (value.IsA("Clothing")) value.Destroy();
			});

			this.character.kill();
			this.instance.RemoveTag("Burning");
		} else {
			if (this.killTicks >= TICKS_TO_DIE / 2)
				this.instance.AddTag("BurnScar");

			const humanoid = this.character.getHumanoid();
			humanoid.TakeDamage(math.min(BURN_DAMAGE, humanoid.Health));

			this.character.adjustTemperature(HEAT_AMOUNT);
		}
	}

	extinguish(): void {
		const torso = this.character.getTorso();
		if (torso) {
			torso.OrangeFire.Enabled = false;
			torso.Burning.Stop();
			torso.Extinguish.Play();
		}
	}

	incineratePart(part: BasePart): void {
		part.Material = Enum.Material.Slate;
		TweenService.Create(
			part,
			new TweenInfo(Players.RespawnTime * 0.75, Enum.EasingStyle.Linear),
			{ Size: Vector3.zero },
		).Play();
	}
}
