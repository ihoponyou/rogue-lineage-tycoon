import { createProducer } from "@rbxts/reflex";
import { Condition } from "shared/configs/conditions";
import { PlayerData } from "./player-data";

export interface ConditionsState {
	readonly [playerId: string]: Array<Condition> | undefined;
}

export const conditionsSlice = createProducer({} as ConditionsState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.conditions,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	addCondition: (state, playerId: string | number, condition: Condition) => {
		const id = tostring(playerId);
		const conditions = state[id];
		if (!conditions) return state;
		if (conditions.includes(condition)) return state;

		return {
			...state,
			[id]: [...conditions, condition],
		};
	},

	removeCondition: (
		state,
		playerId: string | number,
		condition: Condition,
	) => {
		const id = tostring(playerId);
		const conditions = state[id];
		if (!conditions) return state;
		if (!conditions.includes(condition)) return state;

		return {
			...state,
			[id]: conditions.filter((c) => c !== condition),
		};
	},
});
