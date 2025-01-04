import { BaseComponent, Component } from "@flamework/components";
import { Equippable, EquippableAttributes } from "shared/modules/equippable";
import { Useable } from "shared/modules/useable";
import { AbstractCharacter } from "./abstract-character";

interface SkillAttributes extends EquippableAttributes {}

@Component()
export abstract class AbstractActiveSkill
	extends BaseComponent<SkillAttributes>
	implements Equippable, Useable
{
	static readonly TAG = "Skill";

	abstract equip(equipper: AbstractCharacter): void;
	abstract unequip(unequipper: AbstractCharacter): void;

	abstract use(user: AbstractCharacter): void;

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
