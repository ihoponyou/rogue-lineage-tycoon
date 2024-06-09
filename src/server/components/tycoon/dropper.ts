import { Component } from "@flamework/components";
import { Timer, TimerState } from "@rbxts/timer";
import { t } from "@rbxts/t";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";
import { ProductInstance } from "./product";

interface DropperAttributes extends PlotAssetAttributes {
	dropsPerSecond: number;
	productsPerDrop: number;
}

type DropperInstance = PlotAssetInstance & {
	Spout: Attachment;
};

@Component({
	tag: "Dropper",
	attributes: {
		cost: t.numberPositive,
		dropsPerSecond: t.numberPositive,
	},
	defaults: {
		enabled: false,
		bought: false,
		unlocked: false,
		cost: 0,
		currency: "Silver",
		dropsPerSecond: 1,
		productsPerDrop: 1,
	},
})
export class Dropper extends PlotAsset<DropperAttributes, DropperInstance> {
	private timer = new Timer(this.attributes.dropsPerSecond);
	private product?: ProductInstance;

	public override onStart(): void {
		super.onStart();

		this.product = ReplicatedStorage.Assets.Tycoon.Products.shilling;

		this.onAttributeChanged("dropsPerSecond", (newValue) =>
			this.onDropsPerSecondChanged(newValue),
		);

		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());
	}

	private onDropsPerSecondChanged(newValue: number): void {
		this.timer.setLength(1 / newValue);
	}

	protected override onEnabled(): void {
		if (this.timer.getState() === TimerState.NotRunning) this.timer.start();
	}

	protected override onDisabled(): void {
		if (this.timer.getState() === TimerState.Running) this.timer.stop();
	}

	private onTimerCompleted(): void {
		this.drop();
		if (this.attributes.enabled) this.timer.start();
	}

	private drop(): void {
		if (!this.product) {
			warn("dropper product is unassigned");
			return;
		}

		for (let _ = 0; _ < this.attributes.productsPerDrop; _++) {
			// TODO: use a part cache, maybe move to client
			const clone = this.trove.clone(this.product);
			clone.Parent = Workspace;
			clone.AddTag("Product");
			clone.SetAttribute("value", 100);

			if (this.product.IsA("Model")) {
				(clone as Model).PivotTo(this.instance.Spout.WorldCFrame);
			} else if (this.product.IsA("BasePart")) {
				(clone as BasePart).CFrame = this.instance.Spout.WorldCFrame;
			}
		}
	}
}
