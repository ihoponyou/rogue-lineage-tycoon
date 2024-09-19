import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractItem } from "shared/components/abstract-item";

@Component({
	tag: Item.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Item extends AbstractItem {
	public constructor() {
		super();
	}

	public equip(): void {
		Events.item.equip(this.instance);
	}

	public unequip(): void {
		Events.item.unequip(this.instance);
	}

	public drop(): void {
		Events.item.drop(this.instance);
	}
}
