import { createProducer } from "@rbxts/reflex";
import { Currency } from "../../../../../types/currency";
import { PlayerData } from "./player-data";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

export type Currencies = Record<Currency, CurrencyData>;

export interface CurrenciesState {
	readonly [playerId: string]: Currencies | undefined;
}

const initialState: CurrenciesState = {};

export const currenciesSlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.currencies,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	setCurrencyAmount: (
		state,
		playerId: string | number,
		currency: Currency,
		amount: number,
	) => {
		const id = tostring(playerId);
		const playerData = state[id];
		if (!playerData) return state;
		const currencyData = playerData[currency];

		return {
			...state,
			[id]: playerData && {
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
		playerId: string | number,
		currency: Currency,
		multiplier: number,
	) => {
		const id = tostring(playerId);
		const playerData = state[id];
		if (!playerData) return state;
		const currencyData = playerData[currency];

		return {
			...state,
			[id]: playerData && {
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
		playerId: string | number,
		currency: Currency,
		amount: number,
	) => {
		const id = tostring(playerId);
		const playerData = state[id];
		if (!playerData) return state;
		const currencyData = playerData[currency];

		return {
			...state,
			[id]: playerData && {
				...playerData,
				[currency]: {
					...currencyData,
					amount: currencyData.amount + amount,
				},
			},
		};
	},
});
