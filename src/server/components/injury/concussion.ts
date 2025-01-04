import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { BaseInjury } from ".";

@Component({
	tag: "Concussion",
})
export class Concussion extends BaseInjury implements OnStart {
	readonly name = "Concussion";

	onStart(): void {
		this.inflict();
	}

	override inflict(): void {
		super.inflict();

		Events.toggleBlur(this.playerCharacter.getPlayer().instance, true);
	}

	override heal(): void {
		super.heal();

		Events.toggleBlur(this.playerCharacter.getPlayer().instance, false);
	}
}
