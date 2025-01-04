import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { Trove } from "@rbxts/trove";
import { Toggleable } from "shared/components/toggleable";
import { IToggleable } from "shared/toggleable";

type InteractedCallback = (player: Player) => void;

@Component()
export abstract class Interactable<
		A extends {} = {},
		I extends Instance = Instance,
	>
	extends BaseComponent<A, I>
	implements IToggleable
{
	protected trove = new Trove();

	private interacted = new Signal<InteractedCallback>();
	private interactFailed = new Signal();

	constructor(private toggleable: Toggleable) {
		super();
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	interact(player: Player): void {
		if (!this.toggleable.isEnabled()) {
			this.interactFailed.Fire();
			return;
		}
		this.interacted.Fire(player);
	}

	onInteracted(callback: InteractedCallback): void {
		this.trove.connect(this.interacted, (player) => callback(player));
	}

	onInteractFailed(callback: Callback): void {
		this.trove.connect(this.interactFailed, callback);
	}

	isEnabled(): boolean {
		return this.toggleable.isEnabled();
	}

	toggle(bool: boolean): void {
		this.toggleable.toggle(bool);
	}

	isPlayerAllowed(_player: Player): boolean {
		return true;
	}
}
