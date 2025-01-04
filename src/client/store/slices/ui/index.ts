import { createProducer } from "@rbxts/reflex";

interface GuiState {
	readonly isBackpackOpen: boolean;
}

const initialState: GuiState = {
	isBackpackOpen: false,
};

export const uiSlice = createProducer(initialState, {
	toggleBackpackOpen: (state, open: boolean) => {
		return {
			...state,
			isBackpackOpen: open,
		};
	},
});
