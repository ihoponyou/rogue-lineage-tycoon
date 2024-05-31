import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/modules/components/disposable-component";

@Component()
export abstract class Interactable<A extends {}, I extends BasePart | Model>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected abstract inputInstance: ClickDetector | ProximityPrompt;

	onStart(): void {
		this.inputInstance.Parent = this.instance;
		this.trove.add(this.inputInstance);
	}

	abstract onInteract(player: Player): void;
}
