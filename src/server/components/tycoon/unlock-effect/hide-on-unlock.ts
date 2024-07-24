import { Component } from "@flamework/components";
import { ModelComponent } from "shared/components/model";
import { UnlockEffect } from ".";
import { Unlockable } from "../unlockable";

@Component({
	tag: "HideOnUnlock",
})
export class HideOnUnlock extends UnlockEffect {
	public constructor(
		unlockable: Unlockable,
		private model: ModelComponent,
	) {
		super(unlockable);
	}

	public override onUnlocked(): void {
		this.model.hide();
	}
}
