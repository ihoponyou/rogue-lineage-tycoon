import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (_context: CommandContext, player: Player, lives: number) {
	store.setLives(player, lives);
	return `Set ${player.Name}'s lives to ${lives}`;
};
