import { BaseComponent, Component } from "@flamework/components";

export interface ItemAttributes {
	isEquipped: boolean;
}

@Component()
export abstract class AbstractItem<
	A extends ItemAttributes = ItemAttributes,
	I extends Tool = Tool,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Item";
	public abstract equip(): void;
	public abstract unequip(): void;
}
