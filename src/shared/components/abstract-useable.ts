import { BaseComponent, Component } from "@flamework/components";
import { AbstractEquippable } from "./abstract-equippable";

@Component()
export abstract class AbstractUseable extends BaseComponent {
	public static readonly TAG = "Useable";

	protected abstract equippable: AbstractEquippable;

	public canUse(): boolean {
		return this.equippable.attributes.isEquipped;
	}

	public abstract use(player: Player): void;
}
