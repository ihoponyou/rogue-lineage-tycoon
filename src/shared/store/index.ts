import { CombineStates, createSelector } from "@rbxts/reflex";
import { playersSlice } from "./slices/players";
import { DEFAULT_PLAYER_DATA, PlayerData } from "./slices/players/types";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	players: playersSlice,
};

export function selectPlayerStats(playerId: number) {
	return (state: SharedState) => {
		return state.players.stats[playerId];
	};
}

export function selectAllPlayerCurrencies(playerId: number) {
	return (state: SharedState) => {
		return state.players.currency[playerId];
	};
}

export function selectPlayerData(playerId: number) {
	return createSelector(
		selectPlayerStats(playerId),
		selectAllPlayerCurrencies(playerId),
		(stats, currency) => {
			return {
				stats: stats || DEFAULT_PLAYER_DATA.stats,
				currency: currency || DEFAULT_PLAYER_DATA.currency,
			} as PlayerData;
		},
	);
}
