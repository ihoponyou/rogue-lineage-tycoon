import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { UPGRADERS } from "server/configs/tycoon";
import { Toggleable } from "shared/components/toggleable";
import { Product } from "./product";

const DEBOUNCE_LENGTH = 1;

type UpgraderInstance = Instance & {
	Collider: Part;
};

@Component({
	tag: "Upgrader",
})
export class Upgrader
	extends BaseComponent<{}, UpgraderInstance>
	implements OnStart
{
	private config = UPGRADERS[this.instance.Name];
	private processingBlacklist = new Map<Instance, true>();
	private touchedConnection?: RBXScriptConnection;

	public constructor(
		private components: Components,
		private toggleable: Toggleable,
	) {
		super();
		if (this.config === undefined)
			error(`upgrader "${this.instance.Name} does not exist"`);
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

	protected upgrade(product: Product): void {
		// const old = product.attributes.value;
		product.attributes.value *= this.config.multiplier;
		// print(`${old} -> ${product.attributes.value}`);
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
		this.upgrade(product);

		task.delay(DEBOUNCE_LENGTH, () => {
			if (otherPart.Parent !== undefined)
				this.processingBlacklist.delete(otherPart.Parent);
		});
	}
}
