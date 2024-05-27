import { Interactable } from ".";

export abstract class KeyInteractable<
	A extends {},
	I extends BasePart | Model,
> extends Interactable<A, I> {
	private promptDebounce = false;
	protected inputInstance = new Instance("ProximityPrompt");

	override onStart(): void {
		super.onStart();

		this.inputInstance.ClickablePrompt = false;

		this.trove.connect(this.inputInstance.Triggered, (player) =>
			this.onPromptTriggered(player),
		);
	}

	private onPromptTriggered(player: Player): void {
		if (this.promptDebounce) return;
		this.promptDebounce = true;
		this.onInteract(player);
		task.defer(() => (this.promptDebounce = false));
	}
}
