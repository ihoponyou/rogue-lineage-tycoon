import { createProducer } from "@rbxts/reflex";
import { Condition } from "shared/configs/conditions";
import { PlayerData } from "../player-data";

export type ConditionsState = ReadonlyArray<Condition>;

export const conditionsSlice = createProducer([] as ConditionsState, {
	loadPlayerData: (_state, data: PlayerData) => {
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
