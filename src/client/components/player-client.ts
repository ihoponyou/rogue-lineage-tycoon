import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { producer } from "client/gui/producer";

import { AbstractPlayer } from "shared/components/player";

@Component({
	tag: "Player",
})
export class PlayerClient extends AbstractPlayer implements OnStart {
	public onStart(): void {
		this.onAttributeChanged("lives", (newValue) =>
			producer.setLives(newValue),
		);
		this.onAttributeChanged("days", (newValue) =>
			producer.setDays(newValue),
		);
	}
}
