import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";
import { Currency } from "../../../../types/currency";
import { DEFAULT_PLAYER_DATA, PlayerData } from "../slices/players/player-data";

export function selectStats(playerId: number | string) {
	return (state: SharedState) => state.players.stats[tostring(playerId)];
}

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

export function selectResources(playerId: number | string) {
	return (state: SharedState) => state.players.resources[tostring(playerId)];
}

// type ResourcesSelector = (state: SharedState) => Resources | undefined;
// export function createResourceSelector() {}

export function selectHealth(playerId: number | string) {
	return createSelector(selectResources(tostring(playerId)), (resources) => {
		return resources && resources.health;
	});
}

export function selectToxicity(playerId: number | string) {
	return createSelector(selectResources(tostring(playerId)), (resources) => {
		return resources && resources.toxicity;
	});
}

export function selectTemperature(playerId: number | string) {
	return createSelector(selectResources(tostring(playerId)), (resources) => {
		return resources && resources.temperature;
	});
}

export function selectStomach(playerId: number | string) {
	return createSelector(selectResources(tostring(playerId)), (resources) => {
		return resources && resources.stomach;
	});
}

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

export function selectConditions(playerId: number | string) {
	return (state: SharedState) => state.players.conditions[tostring(playerId)];
}

export function selectIdentity(playerId: number | string) {
	return (state: SharedState) => state.players.identity[tostring(playerId)];
}

export function selectManaColor(playerId: number | string) {
	return createSelector(selectIdentity(tostring(playerId)), (identity) => {
		return identity && identity.manaColor;
	});
}

export function selectRace(playerId: number | string) {
	return createSelector(selectIdentity(tostring(playerId)), (identity) => {
		return identity && identity.raceName;
	});
}

export function selectArmorName(playerId: number | string) {
	return createSelector(
		selectIdentity(tostring(playerId)),
		(identity) => identity && identity.armorName,
	);
}

export function selectPlayerData(playerId: number | string) {
	const id = tostring(playerId);
	return createSelector(
		selectStats(id),
		selectCurrencies(id),
		selectResources(id),
		selectMana(id),
		selectConditions(id),
		selectIdentity(id),
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
