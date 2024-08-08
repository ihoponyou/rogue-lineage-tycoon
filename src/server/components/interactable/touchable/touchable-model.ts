import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Touchable } from ".";

type TouchableModelInstance = Model & {
	Collider?: BasePart;
};

@Component({
	tag: TouchableModel.TAG,
})
export class TouchableModel<
		A extends {} = {},
		I extends TouchableModelInstance = TouchableModelInstance,
	>
	extends Touchable<A, I>
	implements OnStart
{
	public static readonly TAG = "TouchableModel";

	public onStart(): void {
		const collider =
			(this.instance.FindFirstChild("Collider") as
				| BasePart
				| undefined) ?? this.instance.PrimaryPart;
		if (collider === undefined)
			error(`must have a dedicated collider or defined PrimaryPart`);
		this.trove.connect(collider.Touched, (otherPart) =>
			this.tryInteraction(otherPart),
		);
	}
}
