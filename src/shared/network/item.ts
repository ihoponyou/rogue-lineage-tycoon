export interface ItemServerEvents {
	equip(equippable: Instance): void;
	unequip(equippable: Instance): void;
	drop(item: Instance): void;
	use(useable: Instance): void;
}
