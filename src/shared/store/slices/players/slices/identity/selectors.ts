import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

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

export function selectFirstName(playerId: number | string) {
	return createSelector(
		selectIdentity(tostring(playerId)),
		(identity) => identity && identity.firstName,
	);
}
