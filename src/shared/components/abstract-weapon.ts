import { BaseComponent, Component } from "@flamework/components";
import { getWeaponConfig } from "shared/configs/weapons";
import { Useable } from "../../../types/useable";
import { AbstractItem } from "./abstract-item";

@Component()
export abstract class AbstractWeapon extends BaseComponent implements Useable {
	public static readonly TAG = "Weapon";

	public readonly config = getWeaponConfig(this.instance.Name);
	protected abstract item: AbstractItem;

	public abstract use(): void;
}
