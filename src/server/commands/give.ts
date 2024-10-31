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
import { Currency } from "shared/modules/currency";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	@Command({
		name: "money",
		description: "bless their cashapp",
		arguments: [
			{
				name: "player",
				description: "blessing receiver",
				type: CenturionType.Player,
			},
			{
				name: "currency",
				description: "the currency of the blessing",
				type: "currency",
			},
			{
				name: "quantity",
				description: "the magnitude of the blessing",
				type: CenturionType.Integer,
			},
		],
	})
	giveMoney(
		context: CommandContext,
		player: Player,
		currency: Currency,
		quantity: number,
	) {
		if (quantity < 0) {
			context.error(
				`Cannot give a negative quantity of ${currency}; use "take money"`,
			);
			return;
		}
		store.addCurrency(player, currency, quantity);
	}
}
