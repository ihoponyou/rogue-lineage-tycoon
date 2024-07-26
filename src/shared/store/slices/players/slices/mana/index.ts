import { createProducer } from "@rbxts/reflex";
import { KeysMatching } from "../../../../../../../types/KeysMatching";
import { PlayerData } from "../player-data";

export interface ManaData {
	readonly amount: number;
	readonly enabled: boolean;
	readonly runEnabled: boolean;
	readonly dashEnabled: boolean;
	readonly climbEnabled: boolean;
}

export interface ManaState {
	readonly [playerId: string]: ManaData | undefined;
}

export const DEFAULT_MANA_DATA: ManaData = {
	amount: 0,
	enabled: false,
	runEnabled: false,
	dashEnabled: false,
	climbEnabled: false,
};

function toggleManaProperty(property: KeysMatching<ManaData, boolean>) {
	return (state: ManaState, playerId: string | number, enabled: boolean) => {
		const id = tostring(playerId);
		const mana = state[id];

		return {
			...state,
			[id]: mana && {
				...mana,
				[property]: enabled,
			},
		};
	};
}

export const manaSlice = createProducer({} as ManaState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.mana,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	setManaAmount: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const mana = state[id];

		return {
			...state,
			[id]: mana && {
				...mana,
				amount: value,
			},
		};
	},

	toggleManaEnabled: toggleManaProperty("enabled"),
	toggleManaRunEnabled: toggleManaProperty("runEnabled"),
	toggleManaDashEnabled: toggleManaProperty("dashEnabled"),
	toggleManaClimbEnabled: toggleManaProperty("climbEnabled"),
});
