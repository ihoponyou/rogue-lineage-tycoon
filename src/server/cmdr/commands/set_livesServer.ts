import { CommandContext } from "@rbxts/cmdr";

export = function (context: CommandContext, player: Player, lives: number) {
	player.SetAttribute("lives", lives);
	return `Set ${player.Name}'s lives to ${lives}`;
};
