import { RootState } from "client/store";

export function selectBackpackOpen() {
	return (state: RootState) => state.gui.backpackOpen;
}

export function selectHotbar() {
	return (state: RootState) => state.gui.hotbar;
}
