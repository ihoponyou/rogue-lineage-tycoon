import { Component, Components } from "@flamework/components";
import { SKILLS } from "server/configs/tycoon";
import { store } from "server/store";
import { SkillId } from "shared/configs/skills";
import { UnlockEffect } from ".";
import { Unlockable } from "../unlockable";

@Component({
	tag: "TeachOnUnlock",
})
export class TeachOnUnlock extends UnlockEffect {
	private skillConfig = SKILLS[this.instance.Name];

	public constructor(
		unlockable: Unlockable,
		private components: Components,
	) {
		super(unlockable);
	}

	public override onStart(): void {
		super.onStart();
		if (this.skillConfig === undefined)
			error(`skill "${this.instance.Name} does not exist"`);
	}

	public override onUnlocked(player: Player): void {
		store.addSkill(player, this.instance.Name as SkillId);
	}
}
