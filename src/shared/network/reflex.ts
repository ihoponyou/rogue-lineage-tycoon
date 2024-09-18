import { BroadcastAction } from "@rbxts/reflex";
import { PlayerData } from "shared/store/slices/player-data";

export interface ReflexServerEvents {
	start: () => void;

	// toggleSetting: (setting: Setting) => void;
}

export interface ReflexClientEvents {
	dispatch: (actions: Array<BroadcastAction>) => void;
	hydrate: (state: PlayerData) => void;
	start: () => void;
}
