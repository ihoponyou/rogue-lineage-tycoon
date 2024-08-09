import { BaseComponent, Component } from "@flamework/components";
import { Useable } from "../../../types/useable";
import { AbstractItem } from "./abstract-item";

@Component()
export abstract class AbstractWeapon extends BaseComponent implements Useable {
	public static readonly TAG = "Weapon";

	protected abstract item: AbstractItem;

	public abstract use(): void;
}
