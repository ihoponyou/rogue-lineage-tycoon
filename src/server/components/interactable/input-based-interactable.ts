import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Interactable } from ".";

@Component()
export abstract class InputBasedInteractable<
		A extends {} = {},
		I extends Instance = Instance,
	>
	extends Interactable<A, I>
	implements OnStart
{
	protected abstract inputInstance: ClickDetector | ProximityPrompt;

	public onStart(): void {
		this.inputInstance.Parent = this.instance;
		this.trove.add(this.inputInstance);
	}
}
