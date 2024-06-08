import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";

interface ProductAttributes {
	isProcessed: boolean;
	value: number;
	currency: Currency;
}

export type ProductInstance = BasePart | Model;

export type Currency = "Silver" | "Insight" | "Valu" | "Alignment";

@Component({
	tag: "Product",
	// instanceGuard: Flamework.createGuard<BasePart | Model>(),
	defaults: {
		isProcessed: false,
		value: 0,
		currency: "Silver",
	},
})
export class Product
	extends DisposableComponent<ProductAttributes, ProductInstance>
	implements OnStart
{
	public onStart(): void {
		if (this.instance.IsA("BasePart"))
			this.instance.CollisionGroup = "Product";

		this.onAttributeChanged("isProcessed", (isProcessed) => {
			if (isProcessed) this.instance.Destroy();
		});
	}
}
