import { createProducer } from "@rbxts/reflex";

interface TemperatureState {
	value: number;
}

const initialState: TemperatureState = {
	value: 50,
};

export const temperatureSlice = createProducer(initialState, {
	setTemperature: (state: { readonly value: number }, value: number) => ({
		...state,
		value: value,
	}),
});
