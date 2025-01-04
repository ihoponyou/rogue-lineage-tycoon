import { Component } from "@flamework/components";
import { UsefulModel } from "shared/components/useful-model";
import { UnlockEffect } from ".";
import { Unlockable } from "../unlockable";

@Component({
	tag: "ShowOnUnlock",
})
export class ShowOnUnlock extends UnlockEffect {
	public constructor(
		unlockable: Unlockable,
		private model: UsefulModel,
	) {
		super(unlockable);
	}

	public override onUnlocked(): void {
		this.model.toggleHidden(false);
	}
}
