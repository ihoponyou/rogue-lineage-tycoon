import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";

export = function (
	context: CommandContext,
	player: Player,
	currency: Currency,
	amount: number,
) {
	const currencyService = Dependency<CurrencyService>();

	currencyService.addCurrency(player, currency, amount);
};
