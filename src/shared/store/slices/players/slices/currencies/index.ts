import { createProducer } from "@rbxts/reflex";
import { Currency } from "../../../../../../../types/currency";
import { PlayerData } from "../player-data";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

export type CurrencyRecord = Record<Currency, CurrencyData>;

export interface CurrenciesState {
	readonly [playerId: string]: CurrencyRecord | undefined;
}

export const DEFAULT_CURRENCY_RECORD = {
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

function createDispatcher(
	action: (currentData: CurrencyRecord) => CurrencyRecord,
) {
	return (currentState: CurrenciesState, playerId: number | string) => {
		const id = tostring(playerId);
		const data = currentState[id];

		if (data === undefined) {
			warn(`currency slice: data missing for ${id}`);
			return currentState;
		}

		return {
			...currentState,
			[id]: action(data),
		};
	};
}

export const currenciesSlice = createProducer(initialState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.currencies,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	resetLineageValues: createDispatcher((oldData) => {
		return {
			...oldData,
			Insight: oldData.Insight,
		};
	}),

	setCurrencyAmount: (
		state,
		playerId: string | number,
		currency: Currency,
		amount: number,
	) =>
		createDispatcher((oldData) => {
			return {
				...oldData,
				[currency]: {
					...oldData[currency],
					amount: amount,
				},
			};
		})(state, playerId),

	setCurrencyMultiplier: (
		state,
		playerId: string | number,
		currency: Currency,
		multiplier: number,
	) =>
		createDispatcher((oldData) => {
			return {
				...oldData,
				[currency]: {
					...oldData[currency],
					multiplier: multiplier,
				},
			};
		})(state, playerId),

	addCurrency: (
		state,
		playerId: string | number,
		currency: Currency,
		amount: number,
	) =>
		createDispatcher((oldData) => {
			const oldCurrencyData = oldData[currency];
			return {
				...oldData,
				[currency]: {
					...oldCurrencyData,
					amount: oldCurrencyData.amount + amount,
				},
			};
		})(state, playerId),
});
