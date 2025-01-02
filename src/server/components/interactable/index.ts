import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { Trove } from "@rbxts/trove";
import { Toggleable } from "shared/toggleable";

type InteractedCallback = (player: Player) => void;

@Component()
export abstract class Interactable<
		A extends {} = {},
		I extends Instance = Instance,
	>
	extends BaseComponent<A, I>
	implements Toggleable
{
	protected trove = new Trove();

	private _isEnabled = false;
	private interacted = new Signal<InteractedCallback>();

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	interact(player: Player): void {
		if (!this._isEnabled) return;
		this.interacted.Fire(player);
	}

	onInteracted(callback: InteractedCallback): void {
		this.trove.connect(this.interacted, (player) => callback(player));
	}

	isEnabled(): boolean {
		return this._isEnabled;
	}

	toggle(bool: boolean): void {
		this._isEnabled = bool;
	}

	isPlayerAllowed(_player: Player): boolean {
		return true;
	}
}
