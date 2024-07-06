import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerStats } from "./types";

export interface StatsState {
	readonly [playerId: number]: PlayerStats | undefined;
}

const initialState: StatsState = {};

export const statsSlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.stats,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	setLives: (state, playerId: number, value: number) => {
		const stats = state[playerId];

		return {
			...state,
			[playerId]: stats && {
				...stats,
				lives: value,
			},
		};
	},

	setDays: (state, playerId: number, value: number) => {
		const stats = state[playerId];

		return {
			...state,
			[playerId]: stats && {
				...stats,
				days: value,
			},
		};
	},
});
