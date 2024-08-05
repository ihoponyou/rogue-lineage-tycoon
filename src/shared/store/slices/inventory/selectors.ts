import { SharedState } from "shared/store";

export function selectInventory() {
	return (state: SharedState) => state.inventory;
}
