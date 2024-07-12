import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "./player-data";

export interface Stats {
	readonly lives: number;
	readonly days: number;
}

export interface StatsState {
	readonly [playerId: string]: Stats | undefined;
}

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

	subtractLife: (state, playerId: string) => {
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

	setDays: (state, playerId: string, value: number) => {
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
