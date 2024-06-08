import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import Signal from "@rbxts/signal";
import { DisposableComponent } from "shared/components/disposable-component";

@Component()
export abstract class Interactable<A extends {}, I extends BasePart | Model>
	extends DisposableComponent<A, I>
	implements OnStart
{
	private interacted = new Signal();
	protected abstract inputInstance: ClickDetector | ProximityPrompt;

	public onStart(): void {
		this.inputInstance.Parent = this.instance;
		this.trove.add(this.inputInstance);
	}

	// TODO: refactor to just use events
	protected abstract onInteract(player: Player): void;

	public interact(): void {
		this.interacted.Fire();
	}

	public listenToInteracted(callback: Callback): void {
		this.trove.connect(this.interacted, () => callback());
	}
}
