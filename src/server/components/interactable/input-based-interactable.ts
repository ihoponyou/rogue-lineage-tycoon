import { Component } from "@flamework/components";
import { Flamework, OnStart } from "@flamework/core";
import { Interactable } from ".";

@Component({
	instanceGuard: Flamework.createGuard<BasePart | Model>(),
})
export abstract class InputBasedInteractable
	extends Interactable<{}, Instance>
	implements OnStart
{
	protected abstract inputInstance: ClickDetector | ProximityPrompt;

	public onStart(): void {
		this.inputInstance.Parent = this.instance;
		this.trove.add(this.inputInstance);
	}
}
