import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Trove } from "@rbxts/trove";

@Component({
	tag: "Lava",
})
export class Lava extends BaseComponent<{}, BasePart> implements OnStart {
	private trove = new Trove();

	public onStart(): void {
		this.trove.connect(this.instance.Touched, (otherPart) =>
			this.onTouched(otherPart),
		);
	}

	public onRemoved(): void {
		this.trove.destroy();
	}

	public onTouched(otherPart: BasePart): void {
		if (otherPart.Parent) otherPart.Parent.AddTag("Burning");
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}
}
