import { BaseComponent, Component } from "@flamework/components";

export interface EquippableAttributes {
	isEquipped: boolean;
}

@Component()
export abstract class AbstractEquippable<
	A extends EquippableAttributes = EquippableAttributes,
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Equippable";

	public equip(_player: Player): void {
		this.attributes.isEquipped = true;
	}

	public unequip(_player: Player): void {
		this.attributes.isEquipped = false;
	}
}
