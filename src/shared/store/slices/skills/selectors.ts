import { SharedState } from "shared/store";

export function selectSkills() {
	return (state: SharedState) => state.skills;
}
