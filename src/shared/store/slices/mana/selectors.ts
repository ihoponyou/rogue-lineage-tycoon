import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectMana() {
	return (state: SharedState) => state.mana;
}

export function selectManaAmount() {
	return createSelector(selectMana(), (manaData) => {
		return manaData && manaData.amount;
	});
}

export function selectManaEnabled() {
	return createSelector(selectMana(), (manaData) => {
		return manaData && manaData.enabled;
	});
}
