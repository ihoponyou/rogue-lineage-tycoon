import { Component, Components } from "@flamework/components";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";
import { Dependency } from "@flamework/core";
import { Product } from "./product";

interface CollectorAttributes extends PlotAssetAttributes {
	multiplier: number;
}

type CollectorInstance = PlotAssetInstance;

@Component({
	tag: "Collector",
	defaults: {
		multiplier: 1,
		enabled: false,
		cost: 0,
	},
})
export class Collector extends PlotAsset<
	CollectorAttributes,
	CollectorInstance
> {
	public override onStart(): void {
		super.onStart();

		this.instance.CollisionGroup = "Collector";
		this.trove.connect(this.instance.Touched, (part) => {
			const components = Dependency<Components>();
			const productComponent = components.getComponent<Product>(part);
			if (productComponent) this.collect(productComponent);
		});
	}

	private collect(product: Product): void {
		if (product.attributes.isProcessed) return;
		product.attributes.isProcessed = true;

		const calculatedValue =
			product.attributes.value * this.attributes.multiplier;
		this.plot.deposit(product.attributes.currency, calculatedValue);
		print(`+${calculatedValue}`);
	}
}
