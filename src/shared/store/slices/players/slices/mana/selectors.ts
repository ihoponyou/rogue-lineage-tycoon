import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectMana(playerId: number | string) {
	return (state: SharedState) => state.players.mana[tostring(playerId)];
}

export function selectManaAmount(playerId: number | string) {
	return createSelector(selectMana(tostring(playerId)), (manaData) => {
		return manaData && manaData.amount;
	});
}

export function selectManaEnabled(playerId: number | string) {
	return createSelector(selectMana(tostring(playerId)), (manaData) => {
		return manaData && manaData.enabled;
	});
}
