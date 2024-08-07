import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";

interface GuiState {
	readonly backpackOpen: boolean;
	readonly hotbar: ReadonlyMap<Tool, number>;
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
		// is the given tool in the hotbar?
		const oldSlot = state.hotbar.get(tool);
		if (slot === oldSlot) {
			// yes, and it exists at the given slot
			return state;
		}
		// no, the given tool is not in the hotbar

		// is there something at the given slot?
		let toolAtSlot: Tool | undefined;
		for (const [toolAtIndex, slotIndex] of state.hotbar) {
			if (slot !== slotIndex) continue;
			// yes, and this is the tool
			toolAtSlot = toolAtIndex;
		}
		// no, there is nothing at the given slot

		return Immut.produce(state, (draft) => {
			if (toolAtSlot !== undefined) {
				if (oldSlot === undefined) {
					draft.hotbar.delete(toolAtSlot);
				} else {
					draft.hotbar.set(toolAtSlot, oldSlot);
				}
			}
			draft.hotbar.set(tool, slot);
		});
	},

	removeFromHotbar: (state, tool: Tool) => {
		if (!state.hotbar.has(tool)) {
			return state;
		}
		return Immut.produce(state, (draft) => {
			draft.hotbar.delete(tool);
		});
	},

	setActiveTool: (state, tool?: Tool) => {
		if (state.activeTool === tool) return state;
		return Immut.produce(state, (draft) => {
			draft.activeTool = tool;
		});
	},
});
