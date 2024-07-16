import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";
import { Currency } from "../../../../../../../types/currency";

export function selectCurrencies(playerId: number | string) {
	return (state: SharedState) => state.players.currencies[tostring(playerId)];
}

export function selectCurrency(playerId: number | string, currency: Currency) {
	return createSelector(
		selectCurrencies(tostring(playerId)),
		(currencies) => {
			return currencies && currencies[currency];
		},
	);
}
