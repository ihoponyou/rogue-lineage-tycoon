import { Component } from "@flamework/components";
import { AbstractWeapon } from "shared/components/abstract-weapon";
import { Item } from "./item";

// this exists for the combat manager

@Component({
	tag: Weapon.TAG,
})
export class Weapon extends AbstractWeapon {
	public constructor(protected item: Item) {
		super();
	}
	public use() {}
}
