import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Touchable } from ".";

@Component({
	tag: "TouchablePart",
})
export class TouchablePart<A extends {} = {}, I extends BasePart = BasePart>
	extends Touchable<A, I>
	implements OnStart
{
	public onStart(): void {
		this.trove.connect(this.instance.Touched, (otherPart) => {
			this.tryInteraction(otherPart);
		});
	}
}
