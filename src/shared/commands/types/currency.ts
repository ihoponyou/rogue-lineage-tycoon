import { BaseRegistry } from "@rbxts/centurion";
import { CURRENCIES, Currency, isCurrency } from "shared/modules/currency";
import { CommandArgumentType, createCenturionTypeFromFlameworkGuard } from ".";

export = (registry: BaseRegistry) => {
	registry.registerType(
		createCenturionTypeFromFlameworkGuard<Currency>(
			CommandArgumentType.Currency,
			isCurrency,
			() => CURRENCIES,
		),
	);
};
