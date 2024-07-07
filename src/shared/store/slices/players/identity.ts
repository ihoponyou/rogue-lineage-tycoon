import { createProducer } from "@rbxts/reflex";
import { PlayerData, SerializedColor3 } from "./player-data";

export type Sex = "Male" | "Female";
export interface Identity {
	race: string;
	manaColor: SerializedColor3;
	personality: string;
	phenotype: string;
	sex: Sex;
}

export interface IdentityState {
	readonly [playerId: number]: Identity | undefined;
}

export const identitySlice = createProducer({} as IdentityState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.identity,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	setRace: (state, playerId: number, raceName: string) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				race: raceName,
			},
		};
	},
});
