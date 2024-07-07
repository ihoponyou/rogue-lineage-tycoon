import { createProducer } from "@rbxts/reflex";
import { Condition } from "shared/configs/conditions";
import { PlayerData } from "./player-data";

export interface ConditionsState {
	readonly [playerId: number]: Array<Condition> | undefined;
}

export const conditionsSlice = createProducer({} as ConditionsState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.conditions,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	addCondition: (state, playerId: number, condition: Condition) => {
		const conditions = state[playerId];
		if (!conditions) return state;
		if (conditions.includes(condition)) return state;

		return {
			...state,
			[playerId]: [...conditions, condition],
		};
	},

	removeCondition: (state, playerId: number, condition: Condition) => {
		const conditions = state[playerId];
		if (!conditions) return state;
		if (!conditions.includes(condition)) return state;

		return {
			...state,
			[playerId]: conditions.filter((c) => c !== condition),
		};
	},
});
