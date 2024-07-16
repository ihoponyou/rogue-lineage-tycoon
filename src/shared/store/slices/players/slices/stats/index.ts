import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "../player-data";

export interface Stats {
	readonly lives: number;
	readonly days: number;
}

export interface StatsState {
	readonly [playerId: string]: Stats | undefined;
}

export const DEFAULT_STATS = {
	lives: 3,
	days: 0,
};

const initialState: StatsState = {};

export const statsSlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.stats,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	resetLineageValues: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: DEFAULT_STATS,
	}),

	setLives: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const stats = state[id];

		return {
			...state,
			[id]: stats && {
				...stats,
				lives: value,
			},
		};
	},

	subtractLife: (state, playerId: string | number) => {
		const id = tostring(playerId);
		const stats = state[id];

		return {
			...state,
			[id]: stats && {
				...stats,
				lives: math.max(0, stats.lives - 1),
			},
		};
	},

	setDays: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const stats = state[id];

		return {
			...state,
			[id]: stats && {
				...stats,
				days: value,
			},
		};
	},
});
