import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

import { AbstractPlayer } from "shared/components/abstract-player";

@Component({
	tag: "Player",
})
export class PlayerClient extends AbstractPlayer implements OnStart {
	public onStart(): void {}
}
