import { Component } from "@flamework/components";
import { InputBasedInteractable } from "./input-based-interactable";

// TODO: allow a KeyInteractable to handle multiple keys each with their own unique callbacks (replace grippable/carriable extension)

@Component()
export class KeyInteractable<
	A extends {} = {},
	I extends Instance = Instance,
> extends InputBasedInteractable<A, I> {
	private promptDebounce = false;
	protected inputInstance = new Instance("ProximityPrompt");

	override onStart(): void {
		super.onStart();

		this.inputInstance.ClickablePrompt = false;
		this.inputInstance.Style = Enum.ProximityPromptStyle.Custom;

		this.trove.connect(this.inputInstance.Triggered, (player) =>
			this.onPromptTriggered(player),
		);
	}

	private onPromptTriggered(player: Player): void {
		if (this.promptDebounce) return;
		this.promptDebounce = true;
		this.interact(player);
		task.defer(() => (this.promptDebounce = false));
	}

	public toggle(bool: boolean): void {
		this.inputInstance.Enabled = bool;
	}

	public setKey(key: Enum.KeyCode): void {
		this.inputInstance.KeyboardKeyCode = key;
	}
}
