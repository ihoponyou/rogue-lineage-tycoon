import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "./player-data";

export interface ManaData {
	readonly amount: number;
	readonly enabled: boolean;
}

export interface ManaState {
	readonly [playerId: number]: ManaData | undefined;
}

export const manaSlice = createProducer({} as ManaState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.mana,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	setManaAmount: (state, playerId: number, value: number) => {
		const mana = state[playerId];

		return {
			...state,
			[playerId]: mana && {
				...mana,
				amount: value,
			},
		};
	},

	setManaEnabled: (state, playerId: number, enabled: boolean) => {
		const mana = state[playerId];

		return {
			...state,
			[playerId]: mana && {
				...mana,
				enabled: enabled,
			},
		};
	},
});
