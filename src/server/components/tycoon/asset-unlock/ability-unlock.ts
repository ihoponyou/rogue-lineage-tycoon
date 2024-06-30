import { Component } from "@flamework/components";
import { AssetUnlock } from ".";
import { Inject } from "shared/inject";
import { ManaService } from "server/services/mana-service";
import { PlayerServer } from "server/components/player-server";

@Component({
	tag: "AbilityUnlock",
})
export class AbilityUnlock extends AssetUnlock {
	@Inject
	private manaService!: ManaService;

	public unlock(player: PlayerServer): void {
		switch (this.attributes.assetName) {
			case "Mana":
				this.manaService.toggleManaObtained(player.instance, true);
				break;
			default:
				print(this.config);
		}
	}
}
