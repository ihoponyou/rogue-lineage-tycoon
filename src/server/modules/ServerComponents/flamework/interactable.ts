import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/modules/components/disposable-component";

@Component({
	tag: "Interactable",
})
export class Interactable
	extends DisposableComponent<{}, BasePart | Attachment | Model>
	implements OnStart
{
	public proximityPrompt = new Instance("ProximityPrompt");

	onStart(): void {
		this.proximityPrompt.Parent = this.instance;

		this.trove.connect(
			this.proximityPrompt.Triggered,
			(playerWhoTriggered) => this.onTriggered(playerWhoTriggered),
		);
	}

	onTriggered(player: Player): void {}
}
