import { Component } from "@flamework/components";
import { InputBasedInteractable } from "./input-based-interactable";

@Component({
	tag: "Clickable",
})
export class Clickable extends InputBasedInteractable {
	protected inputInstance = new Instance("ClickDetector");

	public override onStart(): void {
		super.onStart();

		this.trove.connect(this.inputInstance.MouseClick, (player) =>
			this.interact(player),
		);
	}
}
