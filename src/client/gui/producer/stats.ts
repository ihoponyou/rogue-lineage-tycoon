import { createProducer } from "@rbxts/reflex";

export interface StatsState {
	readonly lives: number;
	readonly days: number;
}

const initialState: StatsState = {
	lives: -1,
	days: -1,
};

export const statsSlice = createProducer(initialState, {
	setLives: (state, value: number) => ({
		...state,
		lives: value,
	}),
});
