import { Component } from "@flamework/components";
import { InputBasedInteractable } from "./input-based-interactable";

@Component({
	tag: "ClickInteractable",
})
export class ClickInteractable extends InputBasedInteractable {
	protected inputInstance = new Instance("ClickDetector");

	override onStart(): void {
		super.onStart();

		this.trove.connect(this.inputInstance.MouseClick, (player) =>
			this.interact(player),
		);
	}
}
