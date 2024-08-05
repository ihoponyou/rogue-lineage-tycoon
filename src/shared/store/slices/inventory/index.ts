import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { getItemConfig } from "shared/configs/items";

const initialState = new ReadonlyMap<Tool, number>();

export const inventorySlice = createProducer(initialState, {
	giveItem: (state, item: Tool, quantity: number = 1) => {
		const itemConfig = getItemConfig(item.Name);
		const currentCount = state.get(item);
		if (
			currentCount !== undefined &&
			currentCount + quantity > itemConfig.maxStackSize
		)
			return state;

		return Immut.produce(state, (draft) => {
			draft.set(
				item,
				currentCount === undefined ? quantity : currentCount + quantity,
			);
		});
	},

	takeItem: (state, item: Tool, quantity: number = 1) => {
		const currentCount = state.get(item) ?? 0;
		const newCount = math.max(currentCount - quantity, 0);

		return Immut.produce(state, (draft) => {
			if (newCount > 0) {
				draft.set(item, newCount);
			} else {
				draft.delete(item);
			}
		});
	},
});
