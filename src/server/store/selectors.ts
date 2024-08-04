import { createSelector } from "@rbxts/reflex";
import { PlayerData } from "shared/store/slices/player-data";
import { RootState } from ".";

export function selectPlayer(player: Player) {
	return (state: RootState) => state.get(tostring(player.UserId));
}

export function selectPlayerHealth(player: Player) {
	return createSelector(
		selectPlayer(player),
		(state) => state?.resources.health,
	);
}

export function selectPlayerConditions(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.conditions);
}

export function selectPlayerTransform(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.transform);
}

export function selectPlayerCurrencies(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.currencies);
}

export function selectPlayerStats(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.stats);
}

export function selectPlayerResources(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.resources);
}

export function selectPlayerMana(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.mana);
}

export function selectPlayerIdentity(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.identity);
}

export function selectPlayerData(player: Player) {
	return createSelector(
		selectPlayerStats(player),
		selectPlayerCurrencies(player),
		selectPlayerResources(player),
		selectPlayerMana(player),
		selectPlayerConditions(player),
		selectPlayerIdentity(player),
		selectPlayerTransform(player),
		(
			stats,
			currencies,
			resources,
			mana,
			conditions,
			identity,
			transform,
		) => {
			return {
				stats: stats ?? {},
				currencies: currencies ?? {},
				resources: resources ?? {},
				mana: mana ?? {},
				conditions: conditions ?? {},
				identity: identity ?? {},
				transform: transform ?? {},
			} as PlayerData;
		},
	);
}
