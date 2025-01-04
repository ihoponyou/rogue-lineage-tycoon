import { BroadcastAction } from "@rbxts/reflex";
import { SharedState } from "shared/store";

export interface ReflexServerEvents {
	start: () => void;
}

export interface ReflexClientEvents {
	start: () => void;
	dispatch: (actions: Array<BroadcastAction>) => void;
	hydrate: (state: SharedState) => void;
}
