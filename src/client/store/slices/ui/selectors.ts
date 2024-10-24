import { RootClientState } from "client/store";

export function selectGui() {
	return (state: RootClientState) => state.ui;
}

export function selectIsBackpackOpen() {
	return (state: RootClientState) => state.ui.isBackpackOpen;
}
