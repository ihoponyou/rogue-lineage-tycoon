import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { Currency } from "../../../../types/currency";
import { PRODUCTS } from "server/tycoon-config";
import { ModelComponent } from "shared/components/model";

interface ProductAttributes {
	isProcessed: boolean;
	value: number;
	currency: Currency;
}

export type ProductInstance = Model;

@Component({
	tag: "Product",
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
	constructor(private model: ModelComponent) {
		super();
	}

	public onStart(): void {
		this.model.setCollisionGroup("Product");

		this.attributes.currency = PRODUCTS[this.instance.Name].currency;
		this.attributes.value = PRODUCTS[this.instance.Name].value;

		this.trove.add(
			this.onAttributeChanged("isProcessed", (isProcessed) => {
				if (isProcessed) this.instance.Destroy();
			}),
		);
	}
}
