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

export const identitySlice = createProducer(DEFAULT_IDENTITY, {
	loadPlayerData: (_state, data: PlayerData) => data.identity,

	resetLineageValues: (_state) => DEFAULT_IDENTITY,

	setRace: (state, raceName: string) => {
		return {
			...state,
			raceName: raceName,
		};
	},

	setManaColor: (state, color: Color3) => {
		return {
			...state,
			manaColor: serializeColor3(color),
		};
	},

	setArmor: (state, armorName: string) => {
		return {
			...state,
			armorName: armorName,
		};
	},

	setPersonality: (state, personality: string) => {
		return {
			...state,
			personality: personality,
		};
	},

	setPhenotype: (state, phenotypeName: string) => {
		return {
			...state,
			phenotypeName: phenotypeName,
		};
	},

	setSex: (state, sex: Sex) => {
		return {
			...state,
			sex: sex,
		};
	},

	setFirstName: (state, name: string) => {
		return {
			...state,
			firstName: name,
		};
	},
});
