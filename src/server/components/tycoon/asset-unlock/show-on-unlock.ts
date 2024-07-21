import { Component } from "@flamework/components";
import { PlayerServer } from "server/components/player-server";
import { ModelComponent } from "shared/components/model";
import { AssetUnlock } from ".";

@Component({
	tag: "ShowOnUnlock",
})
export class ShowOnUnlock extends AssetUnlock {
	constructor(private model: ModelComponent) {
		super();
	}

	public unlock(player: PlayerServer): void {
		this.model.show();
	}
}
