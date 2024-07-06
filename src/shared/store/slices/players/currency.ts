import { createProducer } from "@rbxts/reflex";
import { Currency } from "../../../../../types/currency";
import { PlayerCurrencyData, PlayerData } from "./types";

export interface CurrencyState {
	readonly [playerId: number]: PlayerCurrencyData | undefined;
}

const initialState: CurrencyState = {};

export const currencySlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.currency,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	setCurrencyAmount: (
		state,
		playerId: number,
		currency: Currency,
		amount: number,
	) => {
		const playerData = state[playerId];
		if (!playerData) return state;
		const currencyData = playerData[currency];

		return {
			...state,
			[playerId]: playerData && {
				...playerData,
				[currency]: {
					...currencyData,
					amount: amount,
				},
			},
		};
	},

	setCurrencyMultiplier: (
		state,
		playerId: number,
		currency: Currency,
		multiplier: number,
	) => {
		const playerData = state[playerId];
		if (!playerData) return state;
		const currencyData = playerData[currency];

		return {
			...state,
			[playerId]: playerData && {
				...playerData,
				[currency]: {
					...currencyData,
					multiplier: multiplier,
				},
			},
		};
	},
});
