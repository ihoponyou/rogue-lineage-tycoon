import { createProducer } from "@rbxts/reflex";
import { Currency } from "../../../../../types/currency";
import { PlayerData } from "./player-data";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

export type Currencies = Record<Currency, CurrencyData>;

export interface CurrenciesState {
	readonly [playerId: number]: Currencies | undefined;
}

const initialState: CurrenciesState = {};

export const currenciesSlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.currencies,
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

	addCurrency: (
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
					amount: currencyData.amount + amount,
				},
			},
		};
	},
});
