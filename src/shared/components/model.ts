import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Hideable } from "shared/hideable";

type TransparentInstance = BasePart | Decal;
type ToggleableInstance = ParticleEmitter | Light | LayerCollector;

@Component({
	tag: "Model",
})
export class ModelComponent
	extends BaseComponent<{}, Model>
	implements OnStart, Hideable
{
	private parts = new Array<BasePart>();
	private decals = new Array<Decal>();
	private toggleables = new Array<ToggleableInstance>();
	private canCollides = new Map<BasePart, boolean>();
	private transparencies = new Map<TransparentInstance, number>();

	public onStart(): void {
		for (const instance of this.instance.GetDescendants()) {
			if (instance.IsA("BasePart")) {
				this.parts.push(instance);
				this.transparencies.set(instance, instance.Transparency);
				this.canCollides.set(instance, instance.CanCollide);
			} else if (instance.IsA("Decal")) {
				this.decals.push(instance);
				this.transparencies.set(instance, instance.Transparency);
			} else if (
				instance.IsA("ParticleEmitter") ||
				instance.IsA("Light") ||
				instance.IsA("LayerCollector")
			) {
				this.toggleables.push(instance);
			}
		}
	}

	public show(): void {
		for (const part of this.parts) {
			part.Transparency = this.transparencies.get(part)!;
			part.CanCollide = this.canCollides.get(part)!;
		}
		for (const decal of this.decals) {
			decal.Transparency = this.transparencies.get(decal)!;
		}
		this.toggleables.forEach((instance) => (instance.Enabled = true));
	}

	public hide(): void {
		for (const part of this.parts) {
			part.Transparency = 1;
			part.CanCollide = false;
		}
		for (const decal of this.decals) {
			decal.Transparency = 1;
		}
		this.toggleables.forEach((instance) => (instance.Enabled = false));
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

	public setCanCollide(bool: boolean): void {
		for (const part of this.parts) {
			part.CanCollide = bool;
		}
	}
}
