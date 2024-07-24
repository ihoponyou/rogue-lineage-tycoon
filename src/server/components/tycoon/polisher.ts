import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Toggleable } from "shared/components/toggleable";
import { Inject } from "shared/inject";
import { Product } from "./product";

const DEBOUNCE_LENGTH = 1;

type PolisherInstance = Instance & {
	Collider: Part;
};

// TODO: abstract upgrader
@Component({
	tag: "Polisher",
})
export class Polisher
	extends BaseComponent<{}, PolisherInstance>
	implements OnStart
{
	private multiplier = 2;
	private processingBlacklist = new Map<Model, true>();
	private touchedConnection?: RBXScriptConnection;

	@Inject
	private components!: Components;

	constructor(private toggleable: Toggleable) {
		super();
	}

	public onStart(): void {
		this.instance.Collider.CollisionGroup = "Collector";

		this.toggleable.onToggled((bool) => {
			if (bool) {
				this.touchedConnection = this.instance.Collider.Touched.Connect(
					(otherPart) => this.onTouched(otherPart),
				);
			} else {
				if (this.touchedConnection === undefined) return;
				this.touchedConnection = undefined;
			}
		});
	}

	private onTouched(otherPart: BasePart): void {
		if (otherPart.Parent === undefined) return;
		if (!otherPart.Parent.IsA("Model")) return;
		if (!otherPart.Parent.HasTag("Product")) return;
		if (this.processingBlacklist.has(otherPart.Parent)) return;

		this.processingBlacklist.set(otherPart.Parent, true);
		const product = this.components
			.waitForComponent<Product>(otherPart.Parent)
			.expect();
		const old = product.attributes.value;
		product.attributes.value *= this.multiplier;
		// print(`${old} -> ${product.attributes.value}`);
		task.delay(DEBOUNCE_LENGTH, () => {
			if (otherPart.Parent && otherPart.Parent.IsA("Model"))
				this.processingBlacklist.delete(otherPart.Parent);
		});
	}

	public setMultiplier(multiplier: number): void {
		this.multiplier = multiplier;
	}
}
