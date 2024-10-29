import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (_context: CommandContext, player: Player, days: number) {
	store.setDays(player, days);
	return `Set ${player.Name}'s days to ${days}`;
};
