import { Component } from "@flamework/components";
import { Touchable } from ".";

@Component({
	tag: "TouchablePart",
})
export class TouchablePart<
	A extends {} = {},
	I extends BasePart = BasePart,
> extends Touchable<A, I> {
	public onStart(): void {
		this.trove.connect(this.instance.Touched, (otherPart) => {
			this.tryInteraction(otherPart);
		});
	}
}
