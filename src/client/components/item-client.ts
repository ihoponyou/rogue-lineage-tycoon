import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractItem } from "shared/components/abstract-item";
import { Equippable } from "./equippable";

@Component({
	tag: ItemClient.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class ItemClient extends AbstractItem {
	public constructor(protected equippable: Equippable) {
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