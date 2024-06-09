import { createProducer } from "@rbxts/reflex";

export interface StatsState {
	readonly lives: number;
}

const initialState: StatsState = {
	lives: -1,
};

export const statsSlice = createProducer(initialState, {
	setLives: (state, value: number) => ({
		...state,
		silver: value,
	}),
});
