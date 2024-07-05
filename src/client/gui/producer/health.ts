import { createProducer, Producer } from "@rbxts/reflex";

export interface ResourceState {
	readonly amount: number;
	readonly max: number;
	readonly color: Color3;
}

const initialState: ResourceState = {
	amount: 100,
	max: 100,
	color: Color3.fromRGB(206, 61, 48),
};

export const healthSlice = createProducer(initialState, {
	setHealthAmount: (state: ResourceState, value: number) => ({
		...state,
		amount: value,
	}),
	setMaxHealthAmount: (state: ResourceState, value: number) => ({
		...state,
		max: value,
	}),
	setHealthColor: (state: ResourceState, color: Color3) => ({
		...state,
		color: color,
	}),
});
