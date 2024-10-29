import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { SkillId } from "shared/configs/skills";

export = function (context: CommandContext, player: Player, skillId: SkillId) {
	store.addSkill(player, skillId);
};
