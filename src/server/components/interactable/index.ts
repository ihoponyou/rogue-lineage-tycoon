import { Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { DisposableComponent } from "shared/components/disposable-component";

type InteractedCallback = (player: Player) => void;

@Component()
export abstract class Interactable<
	A extends {},
	I extends Instance,
> extends DisposableComponent<A, I> {
	private interacted = new Signal<InteractedCallback>();

	public interact(player: Player): void {
		this.interacted.Fire(player);
	}

	public onInteracted(callback: InteractedCallback): void {
		this.trove.connect(this.interacted, (player) => callback(player));
	}
}
