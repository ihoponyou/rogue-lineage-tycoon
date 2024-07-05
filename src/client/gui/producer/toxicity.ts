import { createProducer, Producer } from "@rbxts/reflex";
import { ResourceState } from "./health";

const initialState: ResourceState = {
	amount: 0,
	max: 100,
	color: Color3.fromRGB(89, 186, 78),
};

export const toxicitySlice = createProducer(initialState, {
	setToxicityAmount: (state: ResourceState, value: number) => ({
		...state,
		amount: value,
	}),
	setMaxToxicityAmount: (state: ResourceState, value: number) => ({
		...state,
		max: value,
	}),
	setToxicityColor: (state: ResourceState, color: Color3) => ({
		...state,
		color: color,
	}),
});
