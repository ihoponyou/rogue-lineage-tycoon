import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/modules/player-data";
import { KeysOfType } from "../../../../../types";

export interface ManaData {
	readonly amount: number;
	// readonly enabled: boolean;
	// readonly runEnabled: boolean;
	// readonly dashEnabled: boolean;
	// readonly climbEnabled: boolean;
}

export const DEFAULT_MANA_DATA: ManaData = {
	amount: 0,
	// enabled: false,
	// runEnabled: false,
	// dashEnabled: false,
	// climbEnabled: false,
};

function toggleManaProperty(property: KeysOfType<ManaData, boolean>) {
	return (state: ManaData, enabled: boolean) => {
		return {
			...state,
			[property]: enabled,
		};
	};
}

export const manaSlice = createProducer(DEFAULT_MANA_DATA, {
	loadPlayerData: (_state, data: PlayerProfileData) => data.mana,

	setManaAmount: (state, value: number) => {
		return {
			...state,
			amount: value,
		};
	},

	// toggleManaEnabled: toggleManaProperty("enabled"),
	// toggleManaRunEnabled: toggleManaProperty("runEnabled"),
	// toggleManaDashEnabled: toggleManaProperty("dashEnabled"),
	// toggleManaClimbEnabled: toggleManaProperty("climbEnabled"),
});
