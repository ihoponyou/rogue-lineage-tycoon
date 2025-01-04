import { Component } from "@flamework/components";
import { UsefulModel } from "shared/components/useful-model";
import { UnlockEffect } from ".";
import { Unlockable } from "../unlockable";

interface Attributes {
	setCanCollide: boolean;
}

@Component({
	tag: "SetCanCollideOnUnlock",
	defaults: {
		setCanCollide: false,
	},
})
export class SetCanCollideOnUnlock extends UnlockEffect<Attributes> {
	public constructor(
		unlockable: Unlockable,
		private model: UsefulModel,
	) {
		super(unlockable);
	}

	public override onUnlocked(): void {
		this.model.setCanCollide(this.attributes.setCanCollide);
	}
}
