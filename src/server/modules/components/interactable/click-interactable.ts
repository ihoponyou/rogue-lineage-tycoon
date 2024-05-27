import { Interactable } from ".";

export abstract class ClickInteractable<
	A extends {},
	I extends BasePart | Model,
> extends Interactable<A, I> {
	protected inputInstance = new Instance("ClickDetector");

	// TODO
}
