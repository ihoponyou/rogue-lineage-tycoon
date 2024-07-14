import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/networking";
import { DisposableComponent } from "shared/components/disposable-component";
import { Clickable } from "./interactable/clickable";

@Component({
	tag: "Dialogue",
})
export class Dialogue extends DisposableComponent implements OnStart {
	constructor(private clickable: Clickable) {
		super();
	}

	public onStart(): void {
		this.clickable.enable();
		this.clickable.onInteracted((player) => {
			Events.openDialogue(player, "Hello... world?");
			task.wait(3);
			Events.openDialogue(player, "Aye, want some meat?");
		});
	}
}
