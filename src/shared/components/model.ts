import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({
	tag: "Model",
})
export class ModelComponent
	extends BaseComponent<{}, Model>
	implements OnStart
{
	private parts = new Array<BasePart>();
	private transparencies = new Map<BasePart, number>();
	private canCollides = new Map<BasePart, boolean>();

	public onStart(): void {
		for (const part of this.instance.GetDescendants()) {
			if (!part.IsA("BasePart")) continue;
			this.parts.push(part);
			this.transparencies.set(part, part.Transparency);
			this.canCollides.set(part, part.CanCollide);
		}
	}

	public show(): void {
		for (const part of this.parts) {
			part.Transparency = this.transparencies.get(part)!;
			part.CanCollide = this.canCollides.get(part)!;
		}
	}

	public hide(): void {
		for (const part of this.parts) {
			part.Transparency = 1;
			part.CanCollide = false;
		}
	}
}
