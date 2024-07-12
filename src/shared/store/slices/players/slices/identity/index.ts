import { createProducer } from "@rbxts/reflex";
import { serializeColor3, SerializedColor3 } from "shared/serialized-color3";
import { PlayerData } from "../player-data";

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
	readonly [playerId: string]: Identity | undefined;
}

export const DEFAULT_IDENTITY: Identity = {
	raceName: "",
	personality: "",
	phenotypeName: "",
	sex: "Male",
	manaColor: {
		R: -1,
		G: -1,
		B: -1,
	},
	armorName: "",
	firstName: "",
};

export const identitySlice = createProducer({} as IdentityState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.identity,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	setRace: (state, playerId: string | number, raceName: string) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				raceName: raceName,
			},
		};
	},

	setManaColor: (state, playerId: string | number, color: Color3) => {
		const id = tostring(playerId);
		const identity = state[id];
		return {
			...state,
			[id]: identity && {
				...identity,
				manaColor: serializeColor3(color),
			},
		};
	},

	setArmor: (state, playerId: string | number, armorName: string) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				armorName: armorName,
			},
		};
	},

	setPersonality: (state, playerId: string | number, personality: string) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				personality: personality,
			},
		};
	},

	setPhenotype: (state, playerId: string | number, phenotypeName: string) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				phenotypeName: phenotypeName,
			},
		};
	},

	setSex: (state, playerId: string | number, sex: Sex) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				sex: sex,
			},
		};
	},

	setFirstName: (state, playerId: string | number, name: string) => {
		const id = tostring(playerId);
		const identity = state[id];

		return {
			...state,
			[id]: identity && {
				...identity,
				firstName: name,
			},
		};
	},
});
