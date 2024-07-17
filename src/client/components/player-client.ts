import { Component } from "@flamework/components";

import { AbstractPlayer } from "shared/components/abstract-player";

@Component({
	tag: "Player",
})
export class PlayerClient extends AbstractPlayer {}
