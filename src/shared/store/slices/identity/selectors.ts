import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectIdentity() {
	return (state: SharedState) => state.identity;
}

export function selectManaColor() {
	return createSelector(selectIdentity(), (identity) => {
		return identity.manaColor;
	});
}

export function selectRace() {
	return createSelector(selectIdentity(), (identity) => {
		return identity.raceName;
	});
}

export function selectArmorName() {
	return createSelector(selectIdentity(), (identity) => identity.armorName);
}

export function selectFirstName() {
	return createSelector(
		selectIdentity(),
		(identity) => identity && identity.firstName,
	);
}
