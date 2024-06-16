import { Controller, OnStart } from "@flamework/core";
import { Events } from "client//networking";

@Controller()
export class ManaController implements OnStart {
	manaEnabled = false;
	mana = 0;

	onStart(): void {
		Events.mana.obtained.connect(() => (this.manaEnabled = true));
		Events.mana.disabled.connect(() => (this.manaEnabled = false));
		Events.mana.changed.connect((value) => (this.mana = value));
	}

	hasMana(): boolean {
		return this.mana > 0;
	}
}
