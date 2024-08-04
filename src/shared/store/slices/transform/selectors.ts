import { SharedState } from "shared/store";

export function selectTransform() {
	return (state: SharedState) => state.transform;
}
