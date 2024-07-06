import { BroadcastAction } from "@rbxts/reflex";
import { PlayerData } from "shared/store/slices/players/types";

export interface ReflexServerEvents {
	start: () => void;

	// toggleSetting: (setting: Setting) => void;
}

export interface ReflexClientEvents {
	dispatch: (actions: Array<BroadcastAction>) => void;
	hydrate: (actions: PlayerData) => void;
	start: () => void;
}
