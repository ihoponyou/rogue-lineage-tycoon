export interface ItemServerEvents {
	equip(item: Tool): void;
	unequip(item: Tool): void;
	drop(item: Tool): void;
}
