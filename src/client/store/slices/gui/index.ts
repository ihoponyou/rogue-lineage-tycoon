import { createProducer } from "@rbxts/reflex";

interface GuiState {
	readonly backpackOpen: boolean;
}

const initialState: GuiState = {
	backpackOpen: false,
};

export const guiSlice = createProducer(initialState, {
	toggleBackpack: (state, open?: boolean) => {
		return {
			...state,
			backpackOpen: open ?? !state.backpackOpen,
		};
	},
});
