import { Component } from "@flamework/components";
import { AbstractPlayer } from "shared/components/player";

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer {
	private assets = new Array<string>();
}
