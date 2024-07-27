import { Component } from "@flamework/components";
import { SKILLS } from "server/configs/tycoon";
import { UnlockEffect } from ".";

@Component({
	tag: "TeachOnUnlock",
})
export class TeachOnUnlock extends UnlockEffect {
	private skillConfig = SKILLS[this.instance.Name];

	public override onStart(): void {
		super.onStart();
		if (this.skillConfig === undefined)
			error(`skill "${this.instance.Name} does not exist"`);
	}

	public override onUnlocked(player: Player): void {
		this.skillConfig.teach(player);
	}
}
