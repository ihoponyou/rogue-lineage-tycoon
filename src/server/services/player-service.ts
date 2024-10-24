import { Service } from "@flamework/core";
import { AbstractPlayer } from "shared/components/abstract-player";
import { OnPlayerAdded } from "../../../types/lifecycles";

@Service()
export class PlayerService implements OnPlayerAdded {
	public onPlayerAdded(player: Player): void {
		player.AddTag(AbstractPlayer.TAG);
	}
}
