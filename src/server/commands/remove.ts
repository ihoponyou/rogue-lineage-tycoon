import {
	CenturionType,
	Command,
	CommandContext,
	Group,
	Guard,
	Register,
} from "@rbxts/centurion";
import { store } from "server/store";
import { selectPlayerCurrencies } from "server/store/selectors";
import isAdmin from "shared/commands/guards/is-admin";
import { CommandArgumentType } from "shared/commands/types";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/configs/skills";
import { Currency } from "shared/modules/currency";

@Register({
	groups: [
		{
			name: "remove",
			description: "take something",
		},
	],
})
@Group("remove")
@Guard(isAdmin)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class RemoveCommand {
	@Command({
		name: "item",
		description: "remove an item from a player",
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
	removeItem(context: CommandContext, player: Player, itemId: ItemId) {
		store.removeItem(player, itemId);
		context.reply(`Successfully gave ${player.Name} ${itemId} x${1}`);
	}

	@Command({
		name: "money",
		description: "curse their cashapp",
		arguments: [
			{
				name: "player",
				description: "curse bearer",
				type: CenturionType.Player,
			},
			{
				name: "currency",
				description: "the currency to be removed",
				type: CommandArgumentType.Currency,
			},
			{
				name: "quantity",
				description: "the amount to be removed",
				type: CenturionType.Integer,
			},
		],
	})
	removeMoney(
		context: CommandContext,
		player: Player,
		currency: Currency,
		quantity: number,
	) {
		if (quantity < 0) {
			context.error(
				`Cannot remove a negative quantity of ${currency}; use "remove money"`,
			);
			return;
		}
		const currentState = store.getState(selectPlayerCurrencies(player));
		if (currentState === undefined) {
			context.error(`${player.Name} could not be found in the store`);
			return;
		}
		const currentAmount = currentState[currency].amount;
		const newAmount = math.max(0, currentAmount - quantity);
		store.setCurrencyAmount(player, currency, newAmount);
		context.reply(`${player.Name} now has ${newAmount} ${currency}`);
	}

	@Command({
		name: "skill",
		description: "remove a skill from a player",
		arguments: [
			{
				name: "player",
				description: "the player to give the skill to",
				type: CenturionType.Player,
			},
			{
				name: "skillId",
				description: "the skill to be removed",
				type: CommandArgumentType.SkillId,
			},
		],
	})
	removeSkill(context: CommandContext, player: Player, skillId: SkillId) {
		store.removeSkill(player, skillId);
		context.reply(`Removed ${skillId} from ${player}`);
	}
}
