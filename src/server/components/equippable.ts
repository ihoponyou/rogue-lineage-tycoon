import { Component } from "@flamework/components";
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
		if (this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		print("ballz");
	}

	public unequip(): void {
		if (!this.attributes.isEquipped) return;
		if (this.owner === undefined) return;

		print("nutz");
	}
}
