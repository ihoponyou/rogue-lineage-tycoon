import { Component } from "@flamework/components";
import { SKILLS } from "server/configs/tycoon";
import { UnlockEffect } from ".";

interface TeachOnUnlockAttributes {
	skillName: string;
}

@Component({
	tag: "TeachOnUnlock",
})
export class TeachOnUnlock extends UnlockEffect<TeachOnUnlockAttributes> {
	private skillConfig = SKILLS[this.attributes.skillName];

	public override onStart(): void {
		super.onStart();
		if (this.skillConfig === undefined)
			error(`skill "${this.attributes.skillName} does not exist"`);
	}

	public override onUnlocked(player: Player): void {
		this.skillConfig.teach(player);
	}
}
