import { Flamework } from "@flamework/core";
import Object from "@rbxts/object-utils";

const activeSkills = {
	"Goblet Throw": 0,
	"Pommel Strike": 0,
	"Triple Strike": 0,
	Agility: 0,
	"Dagger Throw": 0,
	Pickpocket: 0,
	"Lock Manipulation": 0,
	Stealth: 0,
};

export type ActiveSkillId = keyof typeof activeSkills;
export const ACTIVE_SKILL_IDS = Object.keys(activeSkills) as ActiveSkillId[];
export const isActiveSkillId = Flamework.createGuard<ActiveSkillId>();

const passiveSkills = {
	"Mercenary Carry": 0,
	"Plate Training": 0,
	"Spear Dash": 0,
};

export type PassiveSkillId = keyof typeof passiveSkills;

const SKILLS = {
	...activeSkills,
	...passiveSkills,
};

export type SkillId = keyof typeof SKILLS;
export const SKILL_IDS = Object.keys(SKILLS) as SkillId[];
export const isSkillId = Flamework.createGuard<SkillId>();
