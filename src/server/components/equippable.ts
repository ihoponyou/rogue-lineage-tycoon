import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { AbstractEquippable } from "shared/components/abstract-equippable";
import { Ownable } from "./ownable";

@Component({
	tag: Equippable.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class Equippable extends AbstractEquippable implements OnStart {
	public constructor(private ownable: Ownable) {
		super();
	}

	public onStart(): void {
		Events.item.equip.connect((player, instance) => {
			if (instance !== this.instance) return;
			this.equip(player);
		});

		Events.item.unequip.connect((player, instance) => {
			if (instance !== this.instance) return;
			this.unequip(player);
		});
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
