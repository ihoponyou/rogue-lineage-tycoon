import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";
import { Currency } from "../../../../../types/currency";

export function selectCurrencies() {
	return (state: SharedState) => state.currencies;
}

export function selectCurrency(currency: Currency) {
	return createSelector(selectCurrencies(), (currencies) => {
		return currencies[currency];
	});
}
