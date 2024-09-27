import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { getItemConfig } from "shared/configs/items";

interface Inventory {
	tools: ReadonlyMap<Tool, number>;
}

const initialState: Inventory = {
	tools: new Map(),
};

export const inventorySlice = createProducer(initialState, {
	giveTool: (state, item: Tool, quantity: number = 1) => {
		const itemConfig = getItemConfig(item.Name);
		const currentCount = state.tools.get(item);
		if (
			currentCount !== undefined &&
			currentCount + quantity > itemConfig.maxStackSize
		)
			return state;

		return Immut.produce(state, (draft) => {
			draft.tools.set(
				item,
				currentCount === undefined ? quantity : currentCount + quantity,
			);
		});
	},

	takeTool: (state, item: Tool, quantity: number = 1) => {
		const currentCount = state.tools.get(item);
		if (currentCount === undefined) {
			return state;
		}
		const newCount = math.max(currentCount - quantity, 0);

		return Immut.produce(state, (draft) => {
			if (newCount > 0) {
				draft.tools.set(item, newCount);
			} else {
				draft.tools.delete(item);
			}
		});
	},
});
