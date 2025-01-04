import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { ITEMS, ItemId } from "shared/configs/items";
import { PlayerProfileData } from "shared/modules/player-data";

export type InventoryState = ReadonlyMap<ItemId, number>;

export const DEFAULT_INVENTORY_STATE: InventoryState = new Map();

export const inventorySlice = createProducer(DEFAULT_INVENTORY_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.inventory;
	},

	addItem: (state, item: ItemId, quantity: number = 1) => {
		const currentQuantity = state.get(item) ?? 0;
		const maxQuantity = ITEMS[item].maxQuantity;
		if (currentQuantity >= maxQuantity) {
			warn(
				`tried to add item "${item}" while >= max quantity (current:${currentQuantity} max:${maxQuantity})`,
			);
			return state;
		}
		const newQuantity = math.min(currentQuantity + quantity, maxQuantity);

		return Immut.produce(state, (draft) => {
			draft.set(item, newQuantity);
		});
	},

	removeItem: (state, item: ItemId, quantity: number = 1) => {
		const currentQuantity = state.get(item) ?? 0;
		if (currentQuantity === 0) {
			warn(
				`tried to remove item "${item}", but quantity = 0 (current:${currentQuantity})`,
			);
			return state;
		}
		const newQuantity = math.max(0, currentQuantity - quantity);
		return Immut.produce(state, (draft) => {
			draft.set(item, newQuantity);
		});
	},
});
