import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "./player-data";

export interface ManaData {
	readonly amount: number;
	readonly enabled: boolean;
}

export interface ManaState {
	readonly [playerId: string]: ManaData | undefined;
}

export const DEFAULT_MANA_DATA = {
	amount: 0,
	enabled: false,
};

export const manaSlice = createProducer({} as ManaState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.mana,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	setManaAmount: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const mana = state[id];

		return {
			...state,
			[id]: mana && {
				...mana,
				amount: value,
			},
		};
	},

	setManaEnabled: (state, playerId: string | number, enabled: boolean) => {
		const id = tostring(playerId);
		const mana = state[id];

		return {
			...state,
			[id]: mana && {
				...mana,
				enabled: enabled,
			},
		};
	},
});
