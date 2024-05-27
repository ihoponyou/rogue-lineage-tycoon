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
	private promptDebounce = false;
	private proximityPrompt = new Instance("ProximityPrompt");

	onStart(): void {
		this.proximityPrompt.Parent = this.instance;
	}

	onTriggered(handler: (playerWhoTriggered: Player) => void): void {
		this.trove.connect(this.proximityPrompt.Triggered, (player) => {
			// this is stupid
			if (this.promptDebounce) return;
			this.promptDebounce = true;
			handler(player);
			task.defer(() => (this.promptDebounce = false));
		});
	}

	setEnabled(bool: boolean): void {
		this.proximityPrompt.Enabled = bool;
	}
}
