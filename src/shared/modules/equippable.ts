import { AbstractCharacter } from "shared/components/abstract-character";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";

export type EquippableId = ItemId | SkillId;

export interface EquippableAttributes {
	isEquipped: boolean;
}

export interface Equippable {
	equip(equipper: AbstractCharacter): void;
	unequip(unequipper: AbstractCharacter): void;
	isEquipped(): boolean;
	onEquipChanged(
		callback: (isEquipped: boolean) => void,
	): RBXScriptConnection;
}
