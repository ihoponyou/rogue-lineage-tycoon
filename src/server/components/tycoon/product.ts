import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { PRODUCTS } from "server/configs/tycoon";
import { DisposableComponent } from "shared/components/disposable-component";
import { UsefulModel } from "shared/components/useful-model";
import { Currency } from "../../../shared/modules/currency";

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
	public constructor(private model: UsefulModel) {
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
