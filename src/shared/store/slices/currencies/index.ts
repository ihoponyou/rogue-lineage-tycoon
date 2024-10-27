import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/modules/player-data";
import { Currency } from "../../../modules/currency";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

const DEFAULT_CURRENCY_DATA: CurrencyData = {
	amount: 0,
	multiplier: 1,
};

export type Currencies = Record<Currency, CurrencyData>;

export const DEFAULT_CURRENCY_STATE: Currencies = {
	Silver: DEFAULT_CURRENCY_DATA,
	Valu: DEFAULT_CURRENCY_DATA,
	Insight: DEFAULT_CURRENCY_DATA,
	Alignment: DEFAULT_CURRENCY_DATA,
};

export const currenciesSlice = createProducer(DEFAULT_CURRENCY_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.currencies;
	},

	resetLineageValues: (state) => {
		// TODO: implement this
		return {
			...state,
			Insight: state.Insight,
		};
	},

	setCurrencyAmount: (state, currency: Currency, amount: number) => {
		return {
			...state,
			[currency]: {
				...state[currency],
				amount: amount,
			},
		};
	},

	setCurrencyMultiplier: (state, currency: Currency, multiplier: number) => {
		return {
			...state,
			[currency]: {
				...state[currency],
				multiplier: multiplier,
			},
		};
	},

	addCurrency: (state, currency: Currency, amount: number) => {
		const oldCurrencyData = state[currency];
		return {
			...state,
			[currency]: {
				...oldCurrencyData,
				amount: oldCurrencyData.amount + amount,
			},
		};
	},
});
