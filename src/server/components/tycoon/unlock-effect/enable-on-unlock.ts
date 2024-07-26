import { Component } from "@flamework/components";
import { Toggleable } from "shared/components/toggleable";
import { UnlockEffect } from ".";
import { Unlockable } from "../unlockable";

@Component({
	tag: "EnableOnUnlock",
})
export class EnableOnUnlock extends UnlockEffect {
	public constructor(
		unlockable: Unlockable,
		private toggleable: Toggleable,
	) {
		super(unlockable);
	}

	public override onUnlocked(): void {
		this.toggleable.toggle(true);
	}
}
