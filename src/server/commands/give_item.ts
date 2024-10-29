import {
	CenturionType,
	Command,
	CommandContext,
	CommandGuard,
	Group,
	Guard,
	Register,
} from "@rbxts/centurion";
import { store } from "server/store";
import { GROUP_ID, MINIMUM_ADMIN_RANK } from "shared/configs/group";
import { isItemId } from "shared/configs/items";

const isAdmin: CommandGuard = (ctx) => {
	if (ctx.executor.GetRankInGroup(GROUP_ID) < MINIMUM_ADMIN_RANK) {
		ctx.error("Insufficient permission!");
		return false;
	}

	return true;
};

@Register({
	groups: [
		{
			name: "give",
			description: "give something",
		},
	],
})
@Group("give")
@Guard(isAdmin)
class GiveCommand {
	@Command({
		name: "item",
		description: "give an item to a player",
		arguments: [
			{
				name: "player",
				description: ":)",
				type: CenturionType.Player,
			},
			{
				name: "itemId",
				description: ":)",
				type: CenturionType.String,
			},
		],
	})
	giveItem(ctx: CommandContext, player: Player, itemId: string) {
		if (!isItemId(itemId)) {
			ctx.error(`${itemId} is not a valid ItemId`);
			return;
		}
		store.addItem(player, itemId);
		ctx.reply(`Successfully gave ${player.Name} ${itemId} x${1}`);
	}
}
