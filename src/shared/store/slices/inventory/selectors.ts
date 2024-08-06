import { SharedState } from "shared/store";

export function selectItems() {
	return (state: SharedState) => state.inventory.items;
}
