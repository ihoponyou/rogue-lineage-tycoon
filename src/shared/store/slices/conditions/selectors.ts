import { SharedState } from "shared/store";

export function selectConditions() {
	return (state: SharedState) => state.conditions;
}
