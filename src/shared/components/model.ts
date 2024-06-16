import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Hideable } from "shared/hideable";

@Component({
	tag: "Model",
})
export class ModelComponent
	extends BaseComponent<{}, Model>
	implements OnStart, Hideable
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

	public setCollisionGroup(group: string): void {
		for (const part of this.parts) {
			part.CollisionGroup = group;
		}
	}

	public setNetworkOwner(owner: Player | undefined): void {
		for (const part of this.parts) {
			if (!part.CanSetNetworkOwnership()[0]) {
				warn(`cannot set network owner of ${part.GetFullName()}`);
				continue;
			}
			part.SetNetworkOwner(owner);
		}
	}
}
