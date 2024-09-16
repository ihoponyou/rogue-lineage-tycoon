import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "../player-data";

export const skillsSlice = createProducer([] as ReadonlyArray<string>, {
	loadPlayerData: (_state, data: PlayerData) => {
		return data.skills;
	},

	resetLineageValues: (_state) => {
		return [];
	},

	addSkill: (state, skillName: string) => {
		if (state.includes(skillName)) return state;

		return [...state, skillName];
	},

	removeSkill: (state, skillName: string) => {
		if (!state.includes(skillName)) return state;

		return state.filter(
			(existingCondition) => existingCondition !== skillName,
		);
	},
});
