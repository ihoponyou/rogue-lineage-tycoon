import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Interactable } from ".";

@Component({
	tag: "ProximityInteractable",
})
export class ProximityInteractable
	extends Interactable<{}, PVInstance>
	implements OnStart
{
	private maxInteractDistance = 10;
	private interactEvent = new Instance("RemoteEvent");

	onStart(): void {
		this.interactEvent.Name = "Interact";
		this.interactEvent.Parent = this.instance;

		this.trove.connect(this.interactEvent.OnServerEvent, (player) => {
			const character = player.Character;
			if (character === undefined) {
				return;
			}
			const distanceToCharacter = this.instance
				.GetPivot()
				.Position.sub(character.GetPivot().Position).Magnitude;
			if (distanceToCharacter > this.maxInteractDistance) {
				return;
			}

			this.interact(player);
		});
	}

	setMaxInteractDistance(distance: number): void {
		this.maxInteractDistance = distance;
	}
}
