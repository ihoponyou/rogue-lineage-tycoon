import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/modules/player-data";

export interface CharacterStats {
	readonly lives: number;
	readonly days: number;
}

export const DEFAULT_STATS: CharacterStats = {
	lives: 3,
	days: 0,
};

export const statsSlice = createProducer(DEFAULT_STATS, {
	loadPlayerData: (_state, data: PlayerProfileData) => data.stats,

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
