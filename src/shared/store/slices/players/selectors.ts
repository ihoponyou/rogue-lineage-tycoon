import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";
import { selectConditions } from "./slices/conditions/selectors";
import { selectCurrencies } from "./slices/currencies/selectors";
import { selectIdentity } from "./slices/identity/selectors";
import { DEFAULT_PLAYER_DATA, PlayerData } from "./slices/player-data";
import { selectResources } from "./slices/resources/selectors";
import { selectStats } from "./slices/stats/selectors";
import { selectTransform } from "./slices/transform/selectors";

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

export function selectPlayerData(playerId: number | string) {
	const id = tostring(playerId);
	return createSelector(
		selectStats(id),
		selectCurrencies(id),
		selectResources(id),
		selectMana(id),
		selectConditions(id),
		selectIdentity(id),
		selectTransform(id),
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
				stats: stats ?? DEFAULT_PLAYER_DATA.stats,
				currencies: currencies ?? DEFAULT_PLAYER_DATA.currencies,
				resources: resources ?? DEFAULT_PLAYER_DATA.resources,
				mana: mana ?? DEFAULT_PLAYER_DATA.mana,
				conditions: conditions ?? DEFAULT_PLAYER_DATA.conditions,
				identity: identity ?? DEFAULT_PLAYER_DATA.identity,
				transform: transform ?? DEFAULT_PLAYER_DATA.transform,
			} as PlayerData;
		},
	);
}
