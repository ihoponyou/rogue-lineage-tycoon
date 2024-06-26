import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Product } from "./product";
import { DisposableComponent } from "shared/components/disposable-component";
import { ModelComponent } from "shared/components/model";
import { Toggleable } from "shared/components/toggleable";
import { Furniture, FurnitureInstance } from "./furniture";
import { bool } from "@rbxts/react/src/prop-types";
import { Inject } from "shared/inject";

type CollectorInstance = FurnitureInstance & {
	Collider: Part;
};

@Component({
	tag: "Collector",
})
export class Collector
	extends DisposableComponent<{}, CollectorInstance>
	implements OnStart
{
	private multiplier = 1;
	private touchedConnection?: RBXScriptConnection;

	@Inject
	private components!: Components;

	constructor(private toggleable: Toggleable) {
		super();
	}

	public onStart(): void {
		this.instance.Collider.CollisionGroup = "Collector";

		this.trove.add(
			this.toggleable.onToggled((bool) => {
				if (bool) {
					this.touchedConnection = this.trove.connect(
						this.instance.Collider.Touched,
						(otherPart) => this.onTouched(otherPart),
					);
				} else {
					if (!this.touchedConnection) return;
					this.trove.remove(this.touchedConnection);
					this.touchedConnection = undefined;
				}
			}),
		);
	}

	private onTouched(otherPart: BasePart): void {
		if (otherPart.HasTag("Product")) {
			return;
		}
		if (!otherPart.Parent) {
			return;
		}
		if (otherPart.Parent.ClassName !== "Model") {
			return;
		}
		this.components
			.waitForComponent<Product>(otherPart.Parent)
			.andThen((value) => this.collect(value))
			.catch((reason) => {
				if (Promise.Error.isKind(reason, Promise.Error.Kind.TimedOut)) {
					warn("Operation timed out!");
				} else {
					warn("Operation encountered an error!", reason);
				}
			});
	}

	public setMultiplier(multiplier: number): void {
		this.multiplier = multiplier;
	}

	private collect(product: Product): void {
		if (product.attributes.isProcessed) return;
		product.attributes.isProcessed = true;

		const calculatedValue = product.attributes.value * this.multiplier;
		// this.plotAsset
		// 	.getPlot()
		// 	.deposit(product.attributes.currency, calculatedValue);
	}
}
