import { BaseComponent, Component } from "@flamework/components";
import { AbstractPlayer } from "./abstract-player";

export interface EquippableAttributes {
	isEquipped: boolean;
}

@Component()
export abstract class AbstractEquippable<
	A extends EquippableAttributes = EquippableAttributes,
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	public static readonly TAG = "Equippable";

	protected owner?: AbstractPlayer;

	public abstract equip(): void;
	public abstract unequip(): void;

	public setOwner(owner: AbstractPlayer): void {
		this.owner = owner;
	}
}
