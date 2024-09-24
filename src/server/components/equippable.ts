import { Component } from "@flamework/components";
import { AbstractEquippable } from "shared/components/abstract-equippable";
import { Ownable } from "./ownable";

@Component({
	tag: Equippable.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Equippable extends AbstractEquippable {
	public constructor(private ownable: Ownable) {
		super();
	}

	// TODO: make new namespace or remove from item namespace
	public override equip(player: Player): void {
		if (this.attributes.isEquipped) return;
		if (!this.ownable.ownedBy(player)) return;

		super.equip(player);
	}

	public override unequip(player: Player): void {
		if (!this.attributes.isEquipped) return;
		if (!this.ownable.ownedBy(player)) return;

		super.unequip(player);
	}
}
