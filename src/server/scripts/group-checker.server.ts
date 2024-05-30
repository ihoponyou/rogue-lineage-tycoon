import { Players, RunService } from "@rbxts/services";
import { Events } from "server/modules/networking";

const BRAINBLOX_ID = 15553074;
const MINIMUM_RANK = 1;

function onPlayerAdded(player: Player): void {
	if (player.GetRankInGroup(BRAINBLOX_ID) >= MINIMUM_RANK) return;
	Events.kicked(player);
	player.Kick("not in group");
}

if (!RunService.IsStudio()) {
	Players.GetPlayers().forEach((player) => onPlayerAdded(player));
	Players.PlayerAdded.Connect(onPlayerAdded);
}
