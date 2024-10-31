import { BaseRegistry } from "@rbxts/centurion";
import { isItemId, ITEM_IDS, ItemId } from "shared/configs/items";
import { CommandArgumentType, createCenturionTypeFromFlameworkGuard } from ".";

export = (registry: BaseRegistry) => {
	registry.registerType(
		createCenturionTypeFromFlameworkGuard<ItemId>(
			CommandArgumentType.ItemId,
			isItemId,
			() => ITEM_IDS,
		),
	);
};
