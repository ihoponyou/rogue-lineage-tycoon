import { SharedState } from "shared/store";

export function selectClasses() {
	return (state: SharedState) => state.classes;
}
