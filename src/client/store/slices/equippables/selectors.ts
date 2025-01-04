import { RootClientState } from "client/store";

export function selectEquippables() {
	return (state: RootClientState) => state.equippables;
}
