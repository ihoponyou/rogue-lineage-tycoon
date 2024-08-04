import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "../player-data";

export interface Stats {
	readonly lives: number;
	readonly days: number;
}

export const DEFAULT_STATS: Stats = {
	lives: 3,
	days: 0,
};

export const statsSlice = createProducer(DEFAULT_STATS, {
	loadPlayerData: (_state, data: PlayerData) => data.stats,

	resetLineageValues: (_state) => DEFAULT_STATS,

	setLives: (state, value: number) => {
		return {
			...state,
			lives: value,
		};
	},

	subtractLife: (state) => {
		return {
			...state,
			lives: math.max(0, state.lives - 1),
		};
	},

	setDays: (state, value: number) => {
		return {
			...state,
			days: value,
		};
	},
});
