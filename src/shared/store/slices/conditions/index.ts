import { createProducer } from "@rbxts/reflex";
import { Condition } from "shared/configs/conditions";
import { PlayerProfileData } from "shared/modules/player-data";

export const conditionsSlice = createProducer([] as ReadonlyArray<Condition>, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.conditions;
	},

	resetLifeValues: (_state) => {
		return [];
	},

	addCondition: (state, condition: Condition) => {
		if (state.includes(condition)) return state;

		return [...state, condition];
	},

	removeCondition: (state, condition: Condition) => {
		if (!state.includes(condition)) return state;

		return state.filter(
			(existingCondition) => existingCondition !== condition,
		);
	},
});
