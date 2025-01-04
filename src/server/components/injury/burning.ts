import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, TweenService } from "@rbxts/services";
import { setInterval } from "@rbxts/set-timeout";
import { Trove } from "@rbxts/trove";
import { CharacterServer } from "../character-server";
import { PlayerCharacter } from "../player-character";

const HEAT_AMOUNT = 1.5;
const BURN_DAMAGE = 6;
const BURN_INTERVAL = 0.5;
const TICKS_TO_DIE = 8;

@Component({
	tag: "Burning",
})
export class Burning extends BaseComponent<{}, Model> implements OnStart {
	private killTicks = 0;
	private trove = new Trove();

	constructor(
		private playerCharacter: PlayerCharacter,
		private character: CharacterServer,
	) {
		super();
	}

	override destroy(): void {
		this.extinguish();
		this.trove.clean();
		super.destroy();
	}

	onStart(): void {
		const torso = this.character.getTorso();
		const fireParticle = torso.FindFirstChild("OrangeFire") as
			| ParticleEmitter
			| undefined;
		if (fireParticle !== undefined) fireParticle.Enabled = true;
		const burnSound = torso.FindFirstChild("Burning") as Sound | undefined;
		burnSound?.Play();

		this.trove.add(setInterval(() => this.burn(), BURN_INTERVAL));
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

			this.playerCharacter.adjustTemperature(HEAT_AMOUNT);
		}
	}

	private extinguish(): void {
		const torso = this.character.getTorso();
		if (torso) {
			// TODO: create these onstart and delete on destroy
			const fireParticle = torso.FindFirstChild("OrangeFire") as
				| ParticleEmitter
				| undefined;
			if (fireParticle !== undefined) fireParticle.Enabled = false;
			const burnSound = torso.FindFirstChild("Burning") as
				| Sound
				| undefined;
			burnSound?.Stop();
			const extinguishSound = torso.FindFirstChild("Extinguish") as
				| Sound
				| undefined;
			extinguishSound?.Play();
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
