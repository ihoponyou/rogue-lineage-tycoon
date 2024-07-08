import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";
import { Currency } from "../../../../types/currency";
import { DEFAULT_PLAYER_DATA, PlayerData } from "../slices/players/player-data";

export function selectStats(playerId: number) {
	return (state: SharedState) => state.players.stats[playerId];
}

export function selectCurrencies(playerId: number) {
	return (state: SharedState) => state.players.currencies[playerId];
}

export function selectCurrency(playerId: number, currency: Currency) {
	return createSelector(selectCurrencies(playerId), (currencies) => {
		return currencies && currencies[currency];
	});
}

export function selectResources(playerId: number) {
	return (state: SharedState) => state.players.resources[playerId];
}

// type ResourcesSelector = (state: SharedState) => Resources | undefined;
// export function createResourceSelector() {}

export function selectHealth(playerId: number) {
	return createSelector(selectResources(playerId), (resources) => {
		return resources && resources.health;
	});
}

export function selectToxicity(playerId: number) {
	return createSelector(selectResources(playerId), (resources) => {
		return resources && resources.toxicity;
	});
}

export function selectTemperature(playerId: number) {
	return createSelector(selectResources(playerId), (resources) => {
		return resources && resources.temperature;
	});
}

export function selectStomach(playerId: number) {
	return createSelector(selectResources(playerId), (resources) => {
		return resources && resources.stomach;
	});
}

export function selectMana(playerId: number) {
	return (state: SharedState) => state.players.mana[playerId];
}

export function selectManaAmount(playerId: number) {
	return createSelector(selectMana(playerId), (manaData) => {
		return manaData && manaData.amount;
	});
}

export function selectManaEnabled(playerId: number) {
	return createSelector(selectMana(playerId), (manaData) => {
		return manaData && manaData.enabled;
	});
}

export function selectConditions(playerId: number) {
	return (state: SharedState) => state.players.conditions[playerId];
}

export function selectIdentity(playerId: number) {
	return (state: SharedState) => state.players.identity[playerId];
}

export function selectManaColor(playerId: number) {
	return createSelector(selectIdentity(playerId), (identity) => {
		return identity && identity.manaColor;
	});
}

export function selectRace(playerId: number) {
	return createSelector(selectIdentity(playerId), (identity) => {
		return identity && identity.raceName;
	});
}

export function selectPlayerData(playerId: number) {
	return createSelector(
		selectStats(playerId),
		selectCurrencies(playerId),
		selectResources(playerId),
		selectMana(playerId),
		selectConditions(playerId),
		selectIdentity(playerId),
		(stats, currencies, resources, mana, conditions, identity) => {
			return {
				stats: stats ?? DEFAULT_PLAYER_DATA.stats,
				currencies: currencies ?? DEFAULT_PLAYER_DATA.currencies,
				resources: resources ?? DEFAULT_PLAYER_DATA.resources,
				mana: mana ?? DEFAULT_PLAYER_DATA.mana,
				conditions: conditions ?? DEFAULT_PLAYER_DATA.conditions,
				identity: identity ?? DEFAULT_PLAYER_DATA.identity,
			} as PlayerData;
		},
	);
}
