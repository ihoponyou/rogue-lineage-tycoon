import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { Currency } from "shared/modules/currency";

export = function (
	_context: CommandContext,
	player: Player,
	currency: Currency,
	amount: number,
) {
	store.addCurrency(player, currency, amount);
};
