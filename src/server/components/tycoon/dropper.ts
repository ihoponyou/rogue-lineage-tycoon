import { Component } from "@flamework/components";
import { Timer, TimerState } from "@rbxts/timer";
import { t } from "@rbxts/t";
import { Debris, ReplicatedStorage, Workspace } from "@rbxts/services";
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

const PRODUCT_LIFETIME = 10;

@Component({
	tag: "Dropper",
	attributes: {
		cost: t.numberPositive,
		dropsPerSecond: t.numberPositive,
	},
	defaults: {
		enabled: false,
		bought: false,
		unlocked: true,
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
			Debris.AddItem(clone, PRODUCT_LIFETIME);

			if (clone.IsA("Model")) {
				clone.PivotTo(this.instance.Spout.WorldCFrame);
			} else if (clone.IsA("BasePart")) {
				clone.CFrame = this.instance.Spout.WorldCFrame;
			}
		}
	}
}
