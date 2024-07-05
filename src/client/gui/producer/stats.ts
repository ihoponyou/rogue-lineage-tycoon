import { createProducer } from "@rbxts/reflex";

export interface StatsState {
	readonly lives: number;
	readonly days: number;
}

const initialState: StatsState = {
	lives: 9,
	days: 123,
};

export const statsSlice = createProducer(initialState, {
	setLives: (state, value: number) => ({
		...state,
		lives: value,
	}),
	setDays: (state, value: number) => ({
		...state,
		days: value,
	}),
});
