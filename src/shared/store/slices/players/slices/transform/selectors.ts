import { SharedState } from "shared/store";

export function selectTransform(playerId: number | string) {
	return (state: SharedState) => state.players.transform[tostring(playerId)];
}
