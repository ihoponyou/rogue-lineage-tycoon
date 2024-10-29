import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { ItemId } from "shared/configs/items";

export = function (context: CommandContext, player: Player, itemId: ItemId) {
	store.addItem(player, itemId);
};
