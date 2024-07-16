import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/store";

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
