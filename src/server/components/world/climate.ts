import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart, OnTick } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { OnCharacterAdded } from "../../../../types/lifecycles";
import { CharacterServer } from "../character-server";

interface Attributes {
	temperature: number;
}

const SECONDS_TO_FROSTBITE = 10;
const SECONDS_TO_OVERHEAT = 10;

@Component({
	tag: "Climate",
	defaults: {
		temperature: 50,
	},
})
export class Climate
	extends BaseComponent<Attributes, BasePart>
	implements OnTick, OnStart, OnCharacterAdded
{
	private components = Dependency<Components>();
	private overlapParams = new OverlapParams();

	onStart(): void {
		this.overlapParams.FilterType = Enum.RaycastFilterType.Include;
	}

	onCharacterAdded(character: StarterCharacter): void {
		this.overlapParams.AddToFilter(character);
	}

	onTick(dt: number): void {
		const processedPlayers = new Array<Player>();
		for (const part of Workspace.GetPartBoundsInBox(
			this.instance.CFrame,
			this.instance.Size,
		)) {
			const character = part.Parent as Model | undefined;
			if (!character) continue;
			const player = Players.GetPlayerFromCharacter(character);
			if (!player) continue;

			if (processedPlayers.includes(player)) continue;
			processedPlayers.push(player);

			const characterComponent =
				this.components.getComponent<CharacterServer>(character);
			if (characterComponent) {
				const characterTemperature =
					characterComponent.attributes.temperature;
				const climateTemperature = this.attributes.temperature;

				let deltaTemperature = 0;
				if (climateTemperature < 50) {
					deltaTemperature = -dt * SECONDS_TO_FROSTBITE;
				} else if (characterTemperature < climateTemperature) {
					deltaTemperature = dt * SECONDS_TO_OVERHEAT;
				}
				characterComponent.adjustTemperature(deltaTemperature);
			}
		}
	}
}
