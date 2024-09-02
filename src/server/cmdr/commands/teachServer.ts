import { CommandContext } from "@rbxts/cmdr";
import { SKILLS } from "server/configs/tycoon";

export = function (context: CommandContext, player: Player, skillName: string) {
	SKILLS[skillName]?.teach(player);
};
