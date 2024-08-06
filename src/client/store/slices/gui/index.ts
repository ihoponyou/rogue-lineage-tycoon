import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";

interface GuiState {
	readonly backpackOpen: boolean;
	readonly hotbar: ReadonlyMap<Tool, number>;
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

	addToHotbar: (state, tool: Tool, slot: number) => {
		const oldIndex = state.hotbar.get(tool);
		if (oldIndex === slot) {
			return state;
		}

		return Immut.produce(state, (draft) => {
			if (oldIndex !== undefined) draft.hotbar.delete(tool);
			draft.hotbar.set(tool, slot);
		});
	},

	removeFromHotbar: (state, tool: Tool) => {
		if (!state.hotbar.has(tool)) return state;

		return Immut.produce(state, (draft) => {
			draft.hotbar.delete(tool);
		});
	},
});
