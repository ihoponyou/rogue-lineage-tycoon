import { SharedState } from "shared/store";

export function selectConditions(playerId: number | string) {
	return (state: SharedState) => state.players.conditions[tostring(playerId)];
}
