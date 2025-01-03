import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Hideable } from "shared/hideable";

type TransparentInstance = BasePart | Decal;
type ToggleableInstance = ParticleEmitter | Light | LayerCollector;

@Component({
	tag: UsefulModel.TAG,
})
export class UsefulModel
	extends BaseComponent<{}, Model>
	implements OnStart, Hideable
{
	public static readonly TAG = "Model";

	private parts = new Array<BasePart>();
	private decals = new Array<Decal>();
	private toggleables = new Array<ToggleableInstance>();
	private canCollides = new Map<BasePart, boolean>();
	private transparencies = new Map<TransparentInstance, number>();

	private _isHidden = false;

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

	isHidden(): boolean {
		return this._isHidden;
	}

	toggleHidden(bool?: boolean): void {
		if (this._isHidden === bool) {
			return;
		}
		this._isHidden = bool ?? !this._isHidden;
		for (const part of this.parts) {
			part.Transparency = this._isHidden
				? 1
				: this.transparencies.get(part)!;
			part.CanCollide = this._isHidden
				? false
				: this.canCollides.get(part)!;
		}
		for (const decal of this.decals) {
			decal.Transparency = this._isHidden
				? 1
				: this.transparencies.get(decal)!;
		}
		this.toggleables.forEach(
			(instance) => (instance.Enabled = !this._isHidden),
		);
	}

	show(): void {
		this.toggleHidden(false);
	}

	hide(): void {
		this.toggleHidden(true);
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

	forEachPart(callback: (part: BasePart) => void): void {
		this.parts.forEach(callback);
	}
}
