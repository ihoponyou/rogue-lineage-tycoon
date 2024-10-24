import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, TweenService } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { DisposableComponent } from "shared/components/disposable-component";
import { CharacterServer } from "../character-server";

const HEAT_AMOUNT = 1.5;
const BURN_DAMAGE = 6;
const BURN_INTERVAL = 0.5;
const TICKS_TO_DIE = 8;

@Component({
	tag: "Burning",
})
export class Burning extends DisposableComponent<{}, Model> implements OnStart {
	private killTicks = 0;

	public constructor(private character: CharacterServer) {
		super();
	}

	public onStart(): void {
		const torso = this.character.getTorso();
		torso.OrangeFire.Enabled = true;
		torso.Burning.Play();

		this.trove.add(setInterval(() => this.burn(), BURN_INTERVAL));
	}

	public override destroy(): void {
		this.extinguish();
		super.destroy();
	}

	private burn(): void {
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

	private extinguish(): void {
		const torso = this.character.getTorso();
		if (torso) {
			torso.OrangeFire.Enabled = false;
			torso.Burning.Stop();
			torso.Extinguish.Play();
		}
	}

	private incineratePart(part: BasePart): void {
		part.Material = Enum.Material.Slate;
		TweenService.Create(
			part,
			new TweenInfo(Players.RespawnTime * 0.75, Enum.EasingStyle.Linear),
			{ Size: Vector3.zero },
		).Play();
	}
}
