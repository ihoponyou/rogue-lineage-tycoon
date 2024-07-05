import { CommandContext } from "@rbxts/cmdr";

export = function (context: CommandContext, player: Player, days: number) {
	player.SetAttribute("days", days);
	return `Set ${player.Name}'s days to ${days}`;
};
