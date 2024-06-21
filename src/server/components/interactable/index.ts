import { Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { DisposableComponent } from "shared/components/disposable-component";
import { Toggleable } from "shared/toggleable";

type InteractedCallback = (player: Player) => void;

@Component()
export abstract class Interactable<
		A extends {} = {},
		I extends Instance = Instance,
	>
	extends DisposableComponent<A, I>
	implements Toggleable
{
	private _isEnabled = false;
	private interacted = new Signal<InteractedCallback>();

	public interact(player: Player): void {
		this.interacted.Fire(player);
	}

	public onInteracted(callback: InteractedCallback): void {
		this.trove.connect(this.interacted, (player) => callback(player));
	}

	public isEnabled(): boolean {
		return this._isEnabled;
	}

	public enable(): void {
		this._isEnabled = true;
	}

	public disable(): void {
		this._isEnabled = false;
	}
}
