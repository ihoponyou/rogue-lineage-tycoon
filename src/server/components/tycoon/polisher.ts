import { Component } from "@flamework/components";
import { Product } from "./product";
import { Upgrader } from "./upgrader";

@Component({
	tag: "Polisher",
})
export class Polisher extends Upgrader {
	protected override upgrade(product: Product): void {
		super.upgrade(product);
		// replace old trinket with new, very small chance for artifact
	}
}
