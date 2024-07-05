import { createProducer, Producer } from "@rbxts/reflex";
import { ResourceState } from "./health";

const initialState: ResourceState = {
	amount: 100,
	max: 100,
	color: Color3.fromRGB(240, 208, 26),
};

export const stomachSlice = createProducer(initialState, {
	setStomachAmount: (state: ResourceState, value: number) => ({
		...state,
		amount: value,
	}),
	setMaxStomachAmount: (state: ResourceState, value: number) => ({
		...state,
		max: value,
	}),
	setStomachColor: (state: ResourceState, color: Color3) => ({
		...state,
		color: color,
	}),
});
