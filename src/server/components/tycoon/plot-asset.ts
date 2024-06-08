import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
import { Pad } from "./pad";

export interface PlotAssetAttributes {
	enabled: boolean;
	cost: number;
}

export type PlotAssetInstance = BasePart & {
	Parent: Instance;
	Pad: Instance;
};

export type GenericPlotAsset = PlotAsset<
	PlotAssetAttributes,
	PlotAssetInstance
>;

@Component({
	attributes: {
		cost: t.numberPositive,
	},
})
export abstract class PlotAsset<
		A extends PlotAssetAttributes,
		I extends PlotAssetInstance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected plot!: Plot;
	protected pad!: Pad;

	public onStart(): void {
		const components = Dependency<Components>();
		this.plot = components.getComponent<Plot>(this.instance.Parent)!;
		this.pad = components.getComponent<Pad>(this.instance.Pad)!;

		this.pad.listenToInteracted(() => this.purchase());

		this.plot.addAsset(this);
	}

	public purchase() {
		print(`bought ${this.instance}`);
		this.attributes.enabled = true;
		print(`-${this.attributes.cost}`);
	}

	public getPad(): Pad {
		return this.pad;
	}
}
