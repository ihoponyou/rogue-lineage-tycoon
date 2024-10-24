import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractItem } from "shared/components/abstract-item";

@Component({
	tag: ItemClient.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class ItemClient extends AbstractItem {
	equip(): void {
		Events.item.equip(this.instance, true);
	}

	unequip(): void {
		Events.item.equip(this.instance, false);
	}
}
