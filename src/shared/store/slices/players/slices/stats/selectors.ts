import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectStats(playerId: number | string) {
	return (state: SharedState) => state.players.stats[tostring(playerId)];
}

export function selectLives(playerId: number | string) {
	return createSelector(
		selectStats(playerId),
		(stats) => stats && stats.lives,
	);
}
