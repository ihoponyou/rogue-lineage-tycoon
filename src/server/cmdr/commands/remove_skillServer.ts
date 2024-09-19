import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (context: CommandContext, player: Player, skillName: string) {
	const newState = store
		.removeSkill(player, skillName)
		.get(tostring(player.UserId));
	return newState?.skills.join(", ");
};
