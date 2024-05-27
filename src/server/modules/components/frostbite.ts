import { Component } from "@flamework/components";
import { BaseInjury } from "./base-injury";
import { IdentityService } from "server/modules/Services/flamework/identity-service";
import { Character } from "./character";
import { DataService } from "server/modules/Services/flamework/data-service";
import { OnTick } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Workspace } from "@rbxts/services";

const UPPER_TEMPERATURE_THRESHOLD = 5;
const DEATH_MESSAGE_TEMPLATE = "{Character} froze to death innit";
const ICE_COLOR = Color3.fromRGB(152, 194, 219);

@Component({
	tag: "Frostbite",
})
export class Frostbite extends BaseInjury implements OnTick {
	readonly name = "Frostbite";

	constructor(
		private logger: Logger,
		private identityService: IdentityService,
		protected character: Character,
		protected dataService: DataService,
	) {
		super(character, dataService);
	}

	onStart(): void {
		this.inflict();

		const data = this.dataService.getProfile(
			this.character.getPlayer(),
		).Data;
		if (data.Temperature === 0) {
			data.Temperature = 15;
		}

		const skinColor = this.character.instance.GetAttribute("SkinColor");
		if (skinColor === undefined) return;
		const [h, s, v] = (skinColor as Color3).ToHSV();
		this.identityService.setCharacterSkinColor(
			this.character.instance,
			Color3.fromHSV(h, s / 2, v),
		);
	}

	onTick(dt: number): void {
		if (this.character.attributes.temperature > UPPER_TEMPERATURE_THRESHOLD)
			return;

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

	calculateTickDamage(humanoid: Humanoid, deltaTime: number): number {
		return math.min(humanoid.Health, (humanoid.MaxHealth / 5) * deltaTime);
	}

	freezePart(part: BasePart): void {
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
