import { createProducer } from "@rbxts/reflex";

export interface ManaState {
	readonly amount: number;
	readonly enabled: boolean;
	readonly color: Color3;
}

const initialState: ManaState = {
	amount: 0,
	enabled: false,
	color: new Color3(1, 1, 1),
};

export const manaSlice = createProducer(initialState, {
	setManaAmount: (state, value: number) => ({
		...state,
		amount: value,
	}),
	setEnabled: (state, enabled: boolean) => ({
		...state,
		enabled: enabled,
	}),
	setColor: (state, color: Color3) => ({
		...state,
		color: color,
	}),
});
