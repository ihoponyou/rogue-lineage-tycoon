import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Product } from "./product";
import { DisposableComponent } from "shared/components/disposable-component";
import { ModelComponent } from "shared/components/model";
import { Toggleable } from "shared/toggleable";

type CollectorInstance = Model & {
	Collider: Part;
};

@Component({
	tag: "Collector",
})
export class Collector
	extends DisposableComponent<{}, CollectorInstance>
	implements OnStart, Toggleable
{
	private _isEnabled = false;
	private multiplier = 1;
	private touchedConnection?: RBXScriptConnection;

	constructor(
		private model: ModelComponent,
		// private plotAsset: PlotAsset,
		private components: Components,
	) {
		super();
	}

	public onStart(): void {
		this.model.setCollisionGroup("Collector");

		// this.plotAsset.onAttributeChanged("enabled", (newValue) =>
		// 	newValue ? this.enable() : this.disable(),
		// );
		// this.plotAsset.attributes.enabled ? this.enable() : this.disable();
		this.enable();

		this.trove.connect(this.instance.Collider.Touched, (otherPart) =>
			this.onTouched(otherPart),
		);
	}

	private onTouched(otherPart: BasePart): void {
		if (!this._isEnabled) return;
		if (otherPart.HasTag("Product")) return;
		if (!otherPart.Parent) return;
		if (otherPart.Parent.ClassName !== "Model") return;

		this.components
			.waitForComponent<Product>(otherPart.Parent)
			.timeout(5)
			.andThen((value) => this.collect(value))
			.catch((e) => {
				if (Promise.Error.isKind(e, Promise.Error.Kind.TimedOut)) {
					warn("Operation timed out!");
				} else {
					warn("Operation encountered an error!", e);
				}
			});
	}

	public isEnabled(): boolean {
		return this._isEnabled;
	}

	public enable(): void {
		this._isEnabled = true;
	}

	public disable(): void {
		this._isEnabled = false;
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
