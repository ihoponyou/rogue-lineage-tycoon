import { CommandContext } from "@rbxts/cmdr";
import { SKILLS } from "server/configs/tycoon";

export = function (context: CommandContext, player: Player, skillName: string) {
	const skill = SKILLS[skillName];
	if (skill === undefined) return `Skill "${skillName}" does not exist`;
	skill.teach(player);
};
