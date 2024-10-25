import { Service } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { Events } from "server/network";
import { GROUP_ID, MINIMUM_JOIN_RANK } from "shared/configs/group";
import { OnPlayerAdded } from "shared/modules/lifecycles";

@Service()
export class GroupService implements OnPlayerAdded {
	public onPlayerAdded(player: Player): void {
		if (RunService.IsStudio()) return;
		if (player.GetRankInGroup(GROUP_ID) >= MINIMUM_JOIN_RANK) return;
		Events.kicked(player);
		player.Kick("not in group");
	}
}
