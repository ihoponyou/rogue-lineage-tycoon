import { createProducer } from "@rbxts/reflex";

interface GuiState {
	readonly backpackOpen: boolean;
	readonly hotbar: ReadonlyMap<number, Tool>;
}

const initialState: GuiState = {
	backpackOpen: false,
	hotbar: new Map(),
};

export const guiSlice = createProducer(initialState, {
	toggleBackpack: (state, open?: boolean) => {
		return {
			...state,
			backpackOpen: open ?? !state.backpackOpen,
		};
	},
});
