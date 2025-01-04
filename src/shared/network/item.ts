import { EquippableId } from "shared/modules/equippable";

export interface ItemServerEvents {
	equip(equippable: Instance, shouldEquip: boolean): void;
	drop(item: Instance): void;
	use(useable: Instance): void;
	addToHotbar(equippableId: EquippableId, hotbarSlot: number): void;
	removeFromHotbar(equippableId: EquippableId): void;
}

export interface ItemServerFunctions {
	canEquip(equippable: Instance): boolean;
	getCurrentlyEquippedWeaponInstance(): Instance | undefined;
}
