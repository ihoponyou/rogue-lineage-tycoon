import { Component } from "@flamework/components";
import { InputBasedInteractable } from "./input-based-interactable";

// TODO: allow a KeyInteractable to handle multiple keys each with their own unique callbacks (replace grippable/carriable extension)

@Component({
	tag: "KeyInteractable",
})
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

	toggle(bool: boolean): void {
		this.inputInstance.Enabled = bool;
	}

	setKey(key: Enum.KeyCode): void {
		this.inputInstance.KeyboardKeyCode = key;
	}

	private onPromptTriggered(player: Player): void {
		if (this.promptDebounce) return;
		this.promptDebounce = true;
		try {
			this.interact(player);
		} catch (e) {
			warn(`attempted interaction failed:`, e);
		} finally {
			task.defer(() => (this.promptDebounce = false));
		}
	}
}
