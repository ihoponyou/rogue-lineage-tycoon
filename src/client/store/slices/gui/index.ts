import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";

interface GuiState {
	readonly backpackOpen: boolean;
	readonly hotbar: ReadonlyArray<Tool>;
	readonly activeTool: Tool | undefined;
}

const initialState: GuiState = {
	backpackOpen: false,
	hotbar: [],
	activeTool: undefined,
};

export const guiSlice = createProducer(initialState, {
	toggleBackpack: (state, open?: boolean) => {
		return {
			...state,
			backpackOpen: open ?? !state.backpackOpen,
		};
	},

	addToHotbar: (state, slot: number, tool: Tool) => {
		if (slot < 0 || slot > MAX_HOTBAR_SLOTS) {
			warn(`invalid hotbar slot index of ${slot}`);
			return state;
		}
		// is the given tool in the hotbar?
		const oldSlot = state.hotbar.indexOf(tool);
		if (slot === oldSlot) {
			// yes, and it exists at the given slot
			return state;
		}
		// no, the given tool is not in the hotbar

		// is there something at the given slot?
		const toolAtSlot = state.hotbar[slot];

		return Immut.produce(state, (draft) => {
			if (toolAtSlot !== undefined) {
				if (oldSlot !== -1) {
					draft.hotbar[oldSlot] = toolAtSlot;
				}
			}
			draft.hotbar[slot] = tool;
		});
	},

	removeFromHotbar: (state, tool: Tool) => {
		const slot = state.hotbar.indexOf(tool);
		if (slot === -1) {
			return state;
		}
		return Immut.produce(state, (draft) => {
			draft.hotbar = draft.hotbar.filter((value) => value !== tool);
		});
	},

	setActiveTool: (state, tool?: Tool) => {
		if (state.activeTool === tool) return state;
		return Immut.produce(state, (draft) => {
			draft.activeTool = tool;
		});
	},
});
