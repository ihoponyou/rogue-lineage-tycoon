import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnRemoved } from "../../../../../types/lifecycles";
import { Trove } from "@rbxts/trove";

@Component({
	tag: "Lava",
})
export class Lava
	extends BaseComponent<{}, BasePart>
	implements OnStart, OnRemoved
{
	private trove = new Trove();

	onStart(): void {
		this.trove.connect(this.instance.Touched, (otherPart) =>
			this.onTouched(otherPart),
		);
	}

	onRemoved(): void {
		this.trove.destroy();
	}

	onTouched(otherPart: BasePart): void {
		if (otherPart.Parent) otherPart.Parent.AddTag("Burning");
	}
}
