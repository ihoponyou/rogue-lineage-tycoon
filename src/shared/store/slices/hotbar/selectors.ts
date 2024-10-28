import { SharedState } from "shared/store";

export function selectHotbar() {
	return (state: SharedState) => state.hotbar;
}
