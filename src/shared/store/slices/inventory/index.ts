import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { getItemConfig } from "shared/configs/items";

interface Inventory {
	items: ReadonlyMap<Tool, number>;
}

const initialState: Inventory = {
	items: new Map(),
};

export const inventorySlice = createProducer(initialState, {
	giveItem: (state, item: Tool, quantity: number = 1) => {
		const itemConfig = getItemConfig(item.Name);
		const currentCount = state.items.get(item);
		if (
			currentCount !== undefined &&
			currentCount + quantity > itemConfig.maxStackSize
		)
			return state;

		return Immut.produce(state, (draft) => {
			draft.items.set(
				item,
				currentCount === undefined ? quantity : currentCount + quantity,
			);
		});
	},

	takeItem: (state, item: Tool, quantity: number = 1) => {
		const currentCount = state.items.get(item);
		if (currentCount === undefined) {
			return state;
		}
		const newCount = math.max(currentCount - quantity, 0);

		return Immut.produce(state, (draft) => {
			if (newCount > 0) {
				draft.items.set(item, newCount);
			} else {
				draft.items.delete(item);
			}
		});
	},
});
