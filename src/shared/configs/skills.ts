import { Flamework } from "@flamework/core";
import Object from "@rbxts/object-utils";

export const SKILLS = {
	"Goblet Throw": {},
	"Pommel Strike": {},
	"Triple Strike": {},
	Agility: {},
};

export type SkillId = keyof typeof SKILLS;
export const SKILL_IDS = Object.keys(SKILLS) as SkillId[];
export const isSkillId = Flamework.createGuard<SkillId>();
