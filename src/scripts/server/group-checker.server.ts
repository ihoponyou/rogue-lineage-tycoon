import { Players, RunService } from "@rbxts/services";
import { GROUP_ID, MINIMUM_JOIN_RANK } from "server/configs/group";
import { Events } from "server/networking";

function onPlayerAdded(player: Player): void {
	if (player.GetRankInGroup(GROUP_ID) >= MINIMUM_JOIN_RANK) return;
	Events.kicked(player);
	player.Kick("not in group");
}

if (!RunService.IsStudio()) {
	Players.GetPlayers().forEach((player) => onPlayerAdded(player));
	Players.PlayerAdded.Connect(onPlayerAdded);
}
