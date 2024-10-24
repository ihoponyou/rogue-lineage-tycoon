import { Component, Components } from "@flamework/components";
import { PlayerServer } from "server/components/player-server";
import { SKILLS } from "server/configs/tycoon";
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
		const playerServer = this.components
			.waitForComponent<PlayerServer>(player)
			.expect();
		error("fix me");
		// playerServer.teach(this.instance.Name);
	}
}
