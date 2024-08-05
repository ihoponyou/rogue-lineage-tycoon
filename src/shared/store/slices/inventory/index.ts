import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { getItemConfig } from "shared/configs/items";

const initialState = new ReadonlyMap<string, number>();

export const inventorySlice = createProducer(initialState, {
	giveItem: (state, itemName: string, quantity: number = 1) => {
		const itemConfig = getItemConfig(itemName);
		const currentCount = state.get(itemName);
		if (
			currentCount !== undefined &&
			currentCount === itemConfig.maxStackSize
		)
			return state;

		return Immut.produce(state, (draft) => {
			draft.set(
				itemName,
				currentCount === undefined ? quantity : currentCount + quantity,
			);
		});
	},

	takeItem: (state, itemName: string, quantity: number = 1) => {
		const currentCount = state.get(itemName) ?? 0;
		const newCount = math.max(currentCount - quantity, 0);

		return Immut.produce(state, (draft) => {
			if (newCount > 0) {
				draft.set(itemName, newCount);
			} else {
				draft.delete(itemName);
			}
		});
	},
});
