import { Service } from "@flamework/core";
import { OnPlayerAdded } from "../../../types/lifecycles";

@Service()
export class PlayerService implements OnPlayerAdded {
	public onPlayerAdded(player: Player): void {
		player.AddTag("Player");
	}
}
