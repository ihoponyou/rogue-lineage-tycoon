import { createSelector } from "@rbxts/reflex";
import { selectClasses } from "shared/store/slices/classes/selectors";
import { selectConditions } from "shared/store/slices/conditions/selectors";
import { selectCurrencies } from "shared/store/slices/currencies/selectors";
import { selectIdentity } from "shared/store/slices/identity/selectors";
import { selectMana } from "shared/store/slices/mana/selectors";
import { selectResources } from "shared/store/slices/resources/selectors";
import { selectStats } from "shared/store/slices/stats/selectors";
import { selectTransform } from "shared/store/slices/transform/selectors";
import { RootServerState } from ".";

export function selectPlayer(player: Player) {
	return (state: RootServerState) => state.get(player);
}

export function selectPlayerHealth(player: Player) {
	return createSelector(
		selectPlayerResources(player),
		(state) => state?.health,
	);
}

export function selectPlayerConditions(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectConditions()(state),
	);
}

export function selectPlayerTransform(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectTransform()(state),
	);
}

export function selectPlayerCurrencies(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectCurrencies()(state),
	);
}

export function selectPlayerStats(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectStats()(state),
	);
}

export function selectPlayerResources(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectResources()(state),
	);
}

export function selectPlayerMana(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectMana()(state),
	);
}

export function selectPlayerIdentity(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectIdentity()(state),
	);
}

export function selectPlayerInventory(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.inventory);
}

export function selectPlayerSkills(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.skills);
}

export function selectPlayerClasses(player: Player) {
	return createSelector(selectPlayer(player), (state) =>
		state === undefined ? undefined : selectClasses()(state),
	);
}

// export function selectPlayerData(player: Player) {
// 	return createSelector(
// 		selectPlayerStats(player),
// 		selectPlayerCurrencies(player),
// 		selectPlayerResources(player),
// 		selectPlayerMana(player),
// 		selectPlayerConditions(player),
// 		selectPlayerIdentity(player),
// 		selectPlayerTransform(player),
// 		selectPlayerSkills(player),
// 		selectPlayerClasses(player),
// 		(
// 			stats,
// 			currencies,
// 			resources,
// 			mana,
// 			conditions,
// 			identity,
// 			transform,
// 			skills,
// 			classes,
// 		) => {
// 			return {
// 				stats: stats ?? {},
// 				currencies: currencies ?? {},
// 				resources: resources ?? {},
// 				mana: mana ?? {},
// 				conditions: conditions ?? {},
// 				identity: identity ?? {},
// 				transform: transform ?? {},
// 				skills: skills ?? {},
// 				classes: classes ?? {},
// 			} as PlayerData;
// 		},
// 	);
// }
