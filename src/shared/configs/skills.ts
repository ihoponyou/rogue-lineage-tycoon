import { Flamework } from "@flamework/core";

export enum SkillId {
	GOBLET_THROW = "Goblet Throw",
	POMMEL_STRIKE = "Pommel Strike",
}

export const isSkillId = Flamework.createGuard<SkillId>();
