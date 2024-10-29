import { Component, Components } from "@flamework/components";
import { Modding, OnStart } from "@flamework/core";
import { SKILLS } from "server/configs/skills";
import { IOwnable } from "server/modules/ownable";
import { Events } from "server/network";
import { AbstractSkill } from "shared/components/abstract-skill";
import { SkillId } from "shared/configs/skills";
import { CharacterServer } from "./character-server";
import { Ownable } from "./ownable";
import { Weapon } from "./weapon";

@Component({
	tag: AbstractSkill.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class SkillServer extends AbstractSkill implements OnStart, IOwnable {
	static async instantiate(
		name: SkillId,
		parent?: Instance,
		owner?: CharacterServer,
	): Promise<SkillServer> {
		const skillInstance = new Instance("Tool");
		skillInstance.Parent = script;

		skillInstance.AddTag(Ownable.TAG);
		skillInstance.AddTag(this.TAG);
		skillInstance.Name = name;

		return Modding.resolveSingleton(Components)
			.waitForComponent<SkillServer>(skillInstance)
			.andThen((newSkill) => {
				skillInstance.Parent = parent ?? script;
				newSkill.setOwner(owner);
				return newSkill;
			});
	}

	public readonly config = SKILLS[this.instance.Name as SkillId];

	private equippedWeapon?: Weapon;

	constructor(
		private components: Components,
		protected ownable: Ownable,
	) {
		super();
	}

	onStart(): void {
		if (this.config === undefined) {
			error(`skill config not found for ${this.instance.Name}`);
		}

		Events.item.equip.connect((player, instance, shouldEquip) => {
			if (instance !== this.instance) return;
			const characterInstance = player.Character;
			if (characterInstance === undefined)
				error(`undefined character instance`);
			const character =
				this.components.getComponent<CharacterServer>(
					characterInstance,
				);
			if (character === undefined) error(`undefined character component`);
			if (!this.isOwnedBy(character)) {
				error(
					`${characterInstance.Name} tried to equip ${instance} but does not own`,
				);
			}

			if (shouldEquip) {
				this.equip(character);
			} else {
				this.unequip(character);
			}
		});

		Events.item.use.connect((player, instance) => {
			if (instance !== this.instance) return;
			const characterInstance = player.Character;
			if (characterInstance === undefined)
				error(`undefined character instance`);
			const character =
				this.components.getComponent<CharacterServer>(
					characterInstance,
				);
			if (character === undefined) error(`undefined character component`);
			if (!this.isOwnedBy(character))
				error(
					`${characterInstance.Name} tried to use ${instance} but does not own`,
				);

			if (!this.isEquipped()) return;
			this.use(character);
		});
	}

	equip(equipper: CharacterServer): void {
		equipper.getCurrentEquipped()?.unequip(equipper);
		if (this.config.requiredWeaponType !== undefined) {
			const requiredWeapon = equipper.getWeaponOfType(
				this.config.requiredWeaponType,
			);
			if (requiredWeapon === undefined) return;
			requiredWeapon.rigTo(equipper, true);
			this.equippedWeapon = requiredWeapon;
		}
		equipper.setCurrentEquipped(this);
		this.attributes.isEquipped = true;
	}

	unequip(unequipper: CharacterServer): void {
		this.equippedWeapon?.rigTo(unequipper, false);
		unequipper.setCurrentEquipped(undefined);
		this.attributes.isEquipped = false;
	}

	use(user: CharacterServer): void {
		this.config.activate(user);
	}

	getOwner(): CharacterServer | undefined {
		return this.ownable.getOwner();
	}

	setOwner(character?: CharacterServer): void {
		this.ownable.setOwner(character);
	}

	hasOwner(): boolean {
		return this.ownable.hasOwner();
	}

	isOwnedBy(character: CharacterServer): boolean {
		return this.ownable.isOwnedBy(character);
	}
}
