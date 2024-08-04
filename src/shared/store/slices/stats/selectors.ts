import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectStats() {
	return (state: SharedState) => state.stats;
}

export function selectLives() {
	return createSelector(selectStats(), (stats) => stats.lives);
}
