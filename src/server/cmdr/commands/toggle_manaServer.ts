import { CommandContext } from "@rbxts/cmdr";

export = function (context: CommandContext, player: Player, enable: boolean) {
	enable ? player.AddTag("Mana") : player.RemoveTag("Mana");
};
