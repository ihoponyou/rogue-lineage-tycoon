import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { Toggleable } from "shared/components/toggleable";
import { Inject } from "shared/inject";
import { Plot } from "./plot";
import { Product } from "./product";

type CollectorInstance = Model & {
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
	private plot!: Plot;

	@Inject
	private components!: Components;

	public constructor(private toggleable: Toggleable) {
		super();
		const tycoon = this.instance.FindFirstAncestorOfClass("Model");
		if (!tycoon) error("could not find parent tycoon");
		this.plot = this.components.waitForComponent<Plot>(tycoon).expect();
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
		this.plot.deposit(product.attributes.currency, calculatedValue);
		// print(`+${calculatedValue}`);
	}
}
