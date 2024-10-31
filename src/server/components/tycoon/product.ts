import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Trove } from "@rbxts/trove";
import { PRODUCTS } from "server/configs/tycoon";
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
	extends BaseComponent<ProductAttributes, ProductInstance>
	implements OnStart
{
	private trove = new Trove();

	constructor(private model: UsefulModel) {
		super();
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
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
