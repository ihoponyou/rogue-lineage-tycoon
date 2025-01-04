import { BaseRegistry } from "@rbxts/centurion";
import { isSkillId, SKILL_IDS, SkillId } from "shared/configs/skills";
import { CommandArgumentType, createCenturionTypeFromFlameworkGuard } from ".";

export = (registry: BaseRegistry) => {
	registry.registerType(
		createCenturionTypeFromFlameworkGuard<SkillId>(
			CommandArgumentType.SkillId,
			isSkillId,
			() => SKILL_IDS,
		),
	);
};
