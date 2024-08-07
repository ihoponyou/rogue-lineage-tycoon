import { createSelector } from "@rbxts/reflex";
import { RootState } from "client/store";

export function selectBackpackOpen() {
	return (state: RootState) => state.gui.backpackOpen;
}

export function selectHotbar() {
	return (state: RootState) => state.gui.hotbar;
}

export function selectHotbarHasTool(tool: Tool) {
	return createSelector(selectHotbar(), (tools) => tools.has(tool));
}

export function selectActiveTool() {
	return (state: RootState) => state.gui.activeTool;
}
