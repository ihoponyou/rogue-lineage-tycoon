import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";

interface GuiState {
	readonly backpackOpen: boolean;
	readonly hotbar: ReadonlyMap<number, Tool>; // map so that rbxts wont FUCK WITH MY ARRAY INDICES
	readonly activeTool: Tool | undefined;
}

const initialState: GuiState = {
	backpackOpen: false,
	hotbar: new Map(),
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
		let oldSlot = -1;
		for (const [index, value] of state.hotbar) {
			if (tool === value) {
				oldSlot = index;
				break;
			}
		}
		if (slot === oldSlot) return state;
		const toolAtNewSlot = state.hotbar.get(slot);
		return Immut.produce(state, (draft) => {
			draft.hotbar.set(slot, tool);
			if (oldSlot > -1) {
				if (toolAtNewSlot !== undefined) {
					draft.hotbar.set(oldSlot, toolAtNewSlot);
				} else {
					draft.hotbar.delete(oldSlot);
				}
			}
		});
	},

	removeFromHotbar: (state, tool: Tool) => {
		let slot = -1;
		for (const [index, value] of state.hotbar) {
			if (tool === value) {
				slot = index;
				break;
			}
		}
		if (slot === -1) {
			return state;
		}
		return Immut.produce(state, (draft) => {
			draft.hotbar.delete(slot);
		});
	},

	setActiveTool: (state, tool?: Tool) => {
		if (state.activeTool === tool) return state;
		return Immut.produce(state, (draft) => {
			draft.activeTool = tool;
		});
	},
});
