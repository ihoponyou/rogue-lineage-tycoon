import { createProducer } from "@rbxts/reflex";
import { PlayerData, SerializedColor3 } from "./player-data";

export type Sex = "Male" | "Female";
export interface Identity {
	raceName: string;
	manaColor: SerializedColor3;
	personality: string;
	phenotypeName: string;
	sex: Sex | "";
	armorName: string;
	firstName: string;
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
				raceName: raceName,
			},
		};
	},

	setManaColor: (state, playerId: number, color: Color3) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				manaColor: {
					R: color.R,
					G: color.G,
					B: color.B,
				},
			},
		};
	},

	setArmor: (state, playerId: number, armorName: string) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				armorName: armorName,
			},
		};
	},

	setPersonality: (state, playerId: number, personality: string) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				personality: personality,
			},
		};
	},

	setPhenotype: (state, playerId: number, phenotypeName: string) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				phenotypeName: phenotypeName,
			},
		};
	},

	setSex: (state, playerId: number, sex: Sex) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				sex: sex,
			},
		};
	},

	setFirstName: (state, playerId: number, name: string) => {
		const identity = state[playerId];

		return {
			...state,
			[playerId]: identity && {
				...identity,
				firstName: name,
			},
		};
	},
});
