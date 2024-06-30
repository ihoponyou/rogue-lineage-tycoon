import { Service } from "@flamework/core";
import { OnPlayerAdded } from "../../../types/lifecycles";
import { GROUP_ID, MINIMUM_JOIN_RANK } from "server/configs/group";
import { Events } from "server/networking";
import { RunService } from "@rbxts/services";

@Service()
export class GroupService implements OnPlayerAdded {
	public onPlayerAdded(player: Player): void {
		if (RunService.IsStudio()) return;
		if (player.GetRankInGroup(GROUP_ID) >= MINIMUM_JOIN_RANK) return;
		Events.kicked(player);
		player.Kick("not in group");
	}
}
