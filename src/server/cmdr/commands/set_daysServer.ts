import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (context: CommandContext, player: Player, days: number) {
	store.setDays(player.UserId, days);
	return `Set ${player.Name}'s days to ${days}`;
};
