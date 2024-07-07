import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "./player-data";

export interface Stats {
	readonly lives: number;
	readonly days: number;
}

export interface StatsState {
	readonly [playerId: number]: Stats | undefined;
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

	subtractLife: (state, playerId: number) => {
		const stats = state[playerId];

		return {
			...state,
			[playerId]: stats && {
				...stats,
				lives: math.max(0, stats.lives - 1),
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
