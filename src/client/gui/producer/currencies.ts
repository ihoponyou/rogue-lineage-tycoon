import { createProducer } from "@rbxts/reflex";

export interface CurrenciesState {
	readonly silver: number;
	readonly valu: number;
	readonly insight: number;
	readonly alignment: number;
}

const initialState: CurrenciesState = {
	silver: 0,
	valu: 0,
	insight: 0,
	alignment: 0,
};

export const currenciesSlice = createProducer(initialState, {
	setSilver: (state, value: number) => ({
		...state,
		silver: value,
	}),
});
