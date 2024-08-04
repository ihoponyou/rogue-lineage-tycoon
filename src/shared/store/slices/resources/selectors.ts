import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export function selectResources() {
	return (state: SharedState) => state.resources;
}

export function selectHealth() {
	return createSelector(selectResources(), (resources) => resources.health);
}

export function selectToxicity() {
	return createSelector(selectResources(), (resources) => resources.toxicity);
}

export function selectTemperature() {
	return createSelector(
		selectResources(),
		(resources) => resources.temperature,
	);
}

export function selectStomach() {
	return createSelector(selectResources(), (resources) => resources.stomach);
}
