import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Touchable } from ".";

type TouchableModelInstance = Model & {
	Collider: Part;
};

@Component({
	tag: "TouchableModel",
})
export class TouchableModel<
		A extends {} = {},
		I extends TouchableModelInstance = TouchableModelInstance,
	>
	extends Touchable<A, I>
	implements OnStart
{
	public onStart(): void {
		this.trove.connect(this.instance.Collider.Touched, (otherPart) =>
			this.tryInteraction(otherPart),
		);
	}
}
