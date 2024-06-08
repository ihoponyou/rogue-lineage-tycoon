import { Interactable } from ".";

export abstract class ClickInteractable<
	A extends {},
	I extends BasePart | Model,
> extends Interactable<A, I> {
	protected inputInstance = new Instance("ClickDetector");

	override onStart(): void {
		super.onStart();

		this.trove.connect(this.inputInstance.MouseClick, (player) =>
			this.onClick(player),
		);
	}

	private onClick(player: Player): void {
		this.onInteract(player);
	}
}
