import { createProducer } from "@rbxts/reflex";

export interface CurrenciesState {
	readonly silver: number;
}

const initialState: CurrenciesState = {
	silver: 0,
};

export const currenciesSlice = createProducer(initialState, {
	setSilver: (state, value: number) => ({
		...state,
		silver: value,
	}),
});
