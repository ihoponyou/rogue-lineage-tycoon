import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { setInterval } from "@rbxts/set-timeout";
import { Character } from "./character";
import { Players, TweenService } from "@rbxts/services";
import { OnRemoved } from "../../../../../types/lifecycles";
import Trove from "../../../../../Packages/_Index/sleitnick_trove@1.3.0/trove";

const HEAT_AMOUNT = 1.5;
const BURN_DAMAGE = 6;
const BURN_INTERVAL = 0.5;
const TICKS_TO_DIE = 8;

@Component({
	tag: "Burning",
})
export class Burning extends BaseComponent implements OnStart, OnRemoved {
	private killTicks = 0;
	private cleanupBurnInterval() {}
	private trove = new Trove();

	constructor(private character: Character) {
		super();
	}

	onStart(): void {
		const torso = this.character.getTorso();
		torso.OrangeFire.Enabled = true;
		torso.Burning.Play();

		this.cleanupBurnInterval = setInterval(
			() => this.burn(),
			BURN_INTERVAL,
		);
	}

	onRemoved(): void {
		this.cleanupBurnInterval();
		this.trove.Destroy();
	}

	burn(): void {
		if (this.character.attributes.isKnocked) this.killTicks++;
		else this.killTicks = 0;

		if (this.killTicks >= TICKS_TO_DIE) {
			const torso = this.character.getTorso();
			if (torso) {
				torso.OrangeFire.Enabled = false;
				torso.Burning.Stop();
				torso.Extinguish.Play();
			}

			this.character.instance.GetChildren().forEach((value) => {
				if (value.IsA("BasePart")) this.incineratePart(value);
				else if (value.IsA("Clothing")) value.Destroy();
			});

			this.character.kill();
			this.cleanupBurnInterval();
		} else {
			if (this.killTicks >= TICKS_TO_DIE / 2)
				this.instance.AddTag("BurnScar");

			const humanoid = this.character.getHumanoid();
			humanoid.TakeDamage(math.min(BURN_DAMAGE, humanoid.Health));

			this.character.adjustTemperature(HEAT_AMOUNT);
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
