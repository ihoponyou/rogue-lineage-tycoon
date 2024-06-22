import { Component } from "@flamework/components";
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
> extends Touchable<A, I> {
	public onStart(): void {
		this.trove.connect(this.instance.Collider.Touched, (otherPart) =>
			this.tryInteraction(otherPart),
		);
	}
}
