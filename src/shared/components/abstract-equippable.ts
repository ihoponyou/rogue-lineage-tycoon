import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";

export interface EquippableAttributes {
	isEquipped: boolean;
}

@Component()
export abstract class AbstractEquippable<
	A extends EquippableAttributes = EquippableAttributes,
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Equippable";

	private equipChanged = new Signal<(isEquipped: boolean) => void>();

	public equip(_player: Player): void {
		this.attributes.isEquipped = true;
		this.equipChanged.Fire(true);
	}

	public unequip(_player: Player): void {
		this.attributes.isEquipped = false;
		this.equipChanged.Fire(false);
	}

	public onEquipped(callback: Callback): RBXScriptConnection {
		return this.equipChanged.Connect((isEquipped) => {
			if (isEquipped) callback();
		});
	}

	public onUnequipped(callback: Callback): RBXScriptConnection {
		return this.equipChanged.Connect((isEquipped) => {
			if (!isEquipped) callback();
		});
	}
}
