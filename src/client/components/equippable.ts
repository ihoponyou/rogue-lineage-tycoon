import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractEquippable } from "shared/components/abstract-equippable";

@Component({
	tag: Equippable.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Equippable extends AbstractEquippable {
	// TODO: make new namespace or remove from item namespace
	public equip(): void {
		Events.item.equip(this.instance);
	}

	public unequip(): void {
		Events.item.unequip(this.instance);
	}
}
