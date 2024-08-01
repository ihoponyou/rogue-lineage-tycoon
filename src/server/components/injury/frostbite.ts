import { Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Workspace } from "@rbxts/services";
import { IdentityService } from "server/services/identity-service";
import { store } from "server/store";
import {
	selectResources,
	selectTemperature,
} from "shared/store/slices/players/slices/resources/selectors";
import { BaseInjury } from ".";
import { Character } from "../character/character";

const UPPER_TEMPERATURE_THRESHOLD = 5;
const DEATH_MESSAGE_TEMPLATE = "{Character} froze to death innit";
const ICE_COLOR = Color3.fromRGB(152, 194, 219);

@Component({
	tag: "Frostbite",
})
export class Frostbite extends BaseInjury implements OnStart, OnTick {
	public readonly name = "Frostbite";

	public constructor(
		character: Character,
		private logger: Logger,
		private identityService: IdentityService,
	) {
		super(character);
	}

	public onStart(): void {
		this.inflict();

		const player = this.character.getPlayer();
		const data = store.getState(selectResources(player.UserId));
		if (!data) error("no data");
		if (data.temperature === 0) {
			store.setTemperature(player.UserId, 15);
		}

		let skinColor = this.character.instance.GetAttribute("SkinColor");
		if (skinColor === undefined) {
			this.character.instance
				.GetAttributeChangedSignal("SkinColor")
				.Wait();
			skinColor = this.character.instance.GetAttribute("SkinColor")!;
		}
		const [h, s, v] = (skinColor as Color3).ToHSV();
		this.identityService.setCharacterSkinColor(
			this.character.instance,
			Color3.fromHSV(h, s / 2, v),
		);
	}

	public onTick(dt: number): void {
		if (!this.character.attributes.isAlive) return;
		const characterTemperature = store.getState(
			selectTemperature(this.character.getPlayer().UserId),
		);
		if (characterTemperature === undefined) return;
		if (characterTemperature > UPPER_TEMPERATURE_THRESHOLD) return;

		const humanoid = this.character.getHumanoid();
		humanoid.TakeDamage(this.calculateTickDamage(humanoid, dt));
		if (humanoid.Health > 0) return;

		this.character.instance.GetChildren().forEach((value) => {
			if (!value.IsA("BasePart")) return;
			if (value.Transparency > 0.5) return;
			if (value.Name === "Handle") return;
			this.freezePart(value);
		});

		this.character.kill();
		this.logger.Info(DEATH_MESSAGE_TEMPLATE, this.character.instance.Name);
	}

	private calculateTickDamage(humanoid: Humanoid, deltaTime: number): number {
		return math.min(humanoid.Health, (humanoid.MaxHealth * deltaTime) / 5);
	}

	private freezePart(part: BasePart): void {
		part.Transparency = 1;
		part.Anchored = true;

		const frozen = part.Clone();
		frozen.ClearAllChildren();
		frozen.Parent = Workspace;
		frozen.CFrame = part.CFrame;
		frozen.Size = part.Size;
		frozen.Color = ICE_COLOR;
		frozen.Material = Enum.Material.Ice;
		frozen.Transparency = 0.5;

		const mesh = part.FindFirstChild("Mesh");
		if (mesh) mesh.Clone().Parent = frozen;
	}
}
