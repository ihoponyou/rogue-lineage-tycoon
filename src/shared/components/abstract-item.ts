import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { getItemConfig, ItemConfig, ItemId } from "shared/configs/items";
import { Equippable, EquippableAttributes } from "shared/modules/equippable";
import { AbstractCharacter } from "./abstract-character";

interface ItemAttributes extends EquippableAttributes {
	quantity: number;
}

@Component()
export abstract class AbstractItem
	extends BaseComponent<ItemAttributes>
	implements OnStart, Equippable
{
	public static readonly TAG = "Item";

	public readonly config: ItemConfig = getItemConfig(
		this.instance.Name as ItemId,
	);

	onStart(): void {
		if (this.config === undefined) {
			error(`item config not found for ${this.instance.Name}`);
		}
	}

	abstract equip(equipper: AbstractCharacter): void;
	abstract unequip(unequipper: AbstractCharacter): void;

	onEquipChanged(
		callback: (isEquipped: boolean) => void,
	): RBXScriptConnection {
		return this.onAttributeChanged("isEquipped", (newValue) =>
			callback(newValue),
		);
	}

	isEquipped(): boolean {
		return this.attributes.isEquipped;
	}
}
