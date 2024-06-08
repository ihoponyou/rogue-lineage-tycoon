import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Timer, TimerState } from "@rbxts/timer";
import { DisposableComponent } from "shared/components/disposable-component";
import { t } from "@rbxts/t";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Plot } from "./plot";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";

interface DropperAttributes extends PlotAssetAttributes {
	dropsPerSecond: number;
	productsPerDrop: number;
	enabled: boolean;
}

type DropperInstance = PlotAssetInstance & {
	Spout: Attachment;
};

type Product = BasePart | Model;

@Component({
	tag: "Dropper",
	attributes: {
		cost: t.numberPositive,
		dropsPerSecond: t.numberPositive,
	},
	defaults: {
		dropsPerSecond: 1,
		productsPerDrop: 1,
		enabled: false,
		cost: 0,
	},
})
export class Dropper extends PlotAsset<DropperAttributes, DropperInstance> {
	private timer = new Timer(this.attributes.dropsPerSecond);
	private product?: Product;

	public override onStart(): void {
		super.onStart();

		this.product = ReplicatedStorage.Assets.Tycoon.Products.shilling;

		this.onAttributeChanged("dropsPerSecond", (newValue) =>
			this.onDropsPerSecondChanged(newValue),
		);

		this.onAttributeChanged("enabled", (enabled) =>
			this.onEnabledChanged(enabled),
		);

		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());
		if (this.attributes.enabled) this.timer.start();
	}

	private onDropsPerSecondChanged(newValue: number): void {
		this.timer.setLength(1 / newValue);
	}

	private onEnabledChanged(enabled: boolean): void {
		if (enabled && this.timer.getState() === TimerState.NotRunning)
			this.timer.start();
		else if (this.timer.getState() === TimerState.Running)
			this.timer.stop();
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

			if (this.product.IsA("Model")) {
				(clone as Model).PivotTo(this.instance.Spout.WorldCFrame);
			} else if (this.product.IsA("BasePart")) {
				(clone as BasePart).CFrame = this.instance.Spout.WorldCFrame;
			}
		}
	}
}
