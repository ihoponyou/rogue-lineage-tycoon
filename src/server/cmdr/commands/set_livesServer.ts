import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (context: CommandContext, player: Player, lives: number) {
	store.setLives(player.UserId, lives);
	return `Set ${player.Name}'s lives to ${lives}`;
};
