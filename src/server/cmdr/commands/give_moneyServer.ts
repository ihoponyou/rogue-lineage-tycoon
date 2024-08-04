import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";
import { Currency } from "../../../../types/currency";

export = function (
	_context: CommandContext,
	player: Player,
	currency: Currency,
	amount: number,
) {
	store.addCurrency(player, currency, amount);
};
