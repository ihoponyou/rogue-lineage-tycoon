import { createProducer } from "@rbxts/reflex";
import { Currency } from "../../../../../../../types/currency";
import { PlayerData } from "../player-data";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

export type Currencies = Record<Currency, CurrencyData>;

export interface CurrenciesState {
	readonly [playerId: string]: Currencies | undefined;
}

export const DEFAULT_CURRENCY_DATA = {
	Silver: {
		amount: 0,
		multiplier: 1,
	},
	Valu: {
		amount: 0,
		multiplier: 1,
	},
	Insight: {
		amount: 0,
		multiplier: 1,
	},
	Alignment: {
		amount: 0,
		multiplier: 1,
	},
};

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

	resetLineageValues: (state, playerId: string | number) => {
		const id = tostring(playerId);
		const playerData = state[id];
		const insight = playerData?.Insight;

		return {
			...state,
			[id]: {
				...DEFAULT_CURRENCY_DATA,
				Insight: insight ?? DEFAULT_CURRENCY_DATA.Insight,
			},
		};
	},

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