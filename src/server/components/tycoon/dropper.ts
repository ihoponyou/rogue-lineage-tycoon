import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Timer } from "@rbxts/timer";
import { DisposableComponent } from "shared/components/disposable-component";
import { t } from "@rbxts/t";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

interface DropperAttributes {
	dropsPerSecond: number;
	productsPerDrop: number;
}

type DropperInstance = Instance & {
	Spout: Attachment;
};

type Product = BasePart | Model;

@Component({
	tag: "Dropper",
	attributes: {
		dropsPerSecond: t.numberPositive,
	},
	defaults: {
		dropsPerSecond: 1,
		productsPerDrop: 1,
	},
})
export class Dropper
	extends DisposableComponent<DropperAttributes, DropperInstance>
	implements OnStart
{
	private timer = new Timer(this.attributes.dropsPerSecond);
	private product?: Product;

	public onStart(): void {
		this.product = ReplicatedStorage.Assets.Tycoon.Products.shilling;

		this.onAttributeChanged("dropsPerSecond", (newValue) =>
			this.timer.setLength(1 / newValue),
		);

		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());
		this.timer.start();
	}

	private onTimerCompleted(): void {
		this.timer.start();
		this.drop();
	}

	private drop(): void {
		if (!this.product) {
			warn("dropper product is unassigned");
			return;
		}

		for (let _ = 0; _ < this.attributes.productsPerDrop; _++) {
			// TODO: use a part cache
			const clone = this.trove.clone(this.product);
			clone.Parent = Workspace;

			if (this.product.IsA("Model")) {
				(clone as Model).PivotTo(this.instance.Spout.WorldCFrame);
			} else if (this.product.IsA("BasePart")) {
				(clone as BasePart).CFrame = this.instance.Spout.WorldCFrame;
			}
		}
	}
}
