import { BaseComponent, Component } from "@flamework/components";
import { AbstractEquippable } from "./abstract-equippable";

export interface ItemAttributes {
	isEquipped: boolean;
}

@Component()
export abstract class AbstractItem<
	A extends ItemAttributes = ItemAttributes,
	I extends Tool = Tool,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Item";
	protected abstract equippable: AbstractEquippable;
}
