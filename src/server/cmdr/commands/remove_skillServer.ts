import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { SkillId } from "shared/configs/skills";

export = function (context: CommandContext, player: Player, skillName: string) {
	const newState = store
		.removeSkill(player, skillName as SkillId)
		.get(player);
	return `skills updated for ${player}`;
};
