import { Component, Components } from "@flamework/components";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";
import { Dependency } from "@flamework/core";
import { Product } from "./product";
import { Inject } from "shared/inject";

interface CollectorAttributes extends PlotAssetAttributes {
	multiplier: number;
}

type CollectorInstance = PlotAssetInstance & {
	Collider: BasePart;
};

@Component({
	tag: "Collector",
	defaults: {
		enabled: false,
		bought: false,
		unlocked: true,
		multiplier: 1,
	},
})
export class Collector extends PlotAsset<
	CollectorAttributes,
	CollectorInstance
> {
	private touchedConnection?: RBXScriptConnection;

	public override onStart(): void {
		super.onStart();

		this.instance.Collider.CollisionGroup = "Collector";
	}

	protected override onEnabled(): void {
		this.touchedConnection = this.trove.connect(
			this.instance.Collider.Touched,
			(part) => {
				const productComponent =
					this.components.getComponent<Product>(part);
				if (productComponent) this.collect(productComponent);
			},
		);
	}

	protected override onDisabled(): void {
		if (this.touchedConnection) this.trove.remove(this.touchedConnection);
		this.touchedConnection = undefined;
	}

	private collect(product: Product): void {
		if (product.attributes.isProcessed) return;
		product.attributes.isProcessed = true;

		const calculatedValue =
			product.attributes.value * this.attributes.multiplier;
		this.plot.deposit(product.attributes.currency, calculatedValue);
	}
}
