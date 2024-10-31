import {
	CenturionType,
	Command,
	CommandContext,
	Group,
	Guard,
	Register,
} from "@rbxts/centurion";
import { store } from "server/store";
import isAdmin from "shared/commands/guards/is-admin";
import { CommandArgumentType } from "shared/commands/types";
import { isItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { Currency } from "shared/modules/currency";

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
				type: CommandArgumentType.ItemId,
			},
		],
	})
	giveItem(context: CommandContext, player: Player, itemId: string) {
		if (!isItemId(itemId)) {
			context.error(`${itemId} is not a valid ItemId`);
			return;
		}
		store.addItem(player, itemId);
		context.reply(`Successfully gave ${player.Name} ${itemId} x${1}`);
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
				type: CommandArgumentType.Currency,
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

	@Command({
		name: "skill",
		description: "bless their mind",
		arguments: [
			{
				name: "player",
				description: ":)",
				type: CenturionType.Player,
			},
			{
				name: "skillId",
				description: ":)",
				type: CommandArgumentType.SkillId,
			},
		],
	})
	giveSkill(context: CommandContext, player: Player, skillId: SkillId) {
		store.addSkill(player, skillId);
	}
}
