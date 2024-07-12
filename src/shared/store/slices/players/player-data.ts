import { Condition } from "shared/configs/conditions";
import { Currencies } from "./currencies";
import { Identity } from "./identity";
import { ManaData } from "./mana";
import { Resources } from "./resources";
import { Stats } from "./stats";

export interface SerializedVector {
	readonly X: number;
	readonly Y: number;
	readonly Z: number;
}

export interface SerializedColor3 {
	readonly R: number;
	readonly G: number;
	readonly B: number;
}

export function deserializeColor3(serializedColor: SerializedColor3): Color3 {
	return new Color3(serializedColor.R, serializedColor.G, serializedColor.B);
}

export function serializeColor3(color: Color3): SerializedColor3 {
	return {
		R: color.R,
		G: color.G,
		B: color.B,
	};
}

export type PlayerData = {
	stats: Stats;
	currencies: Currencies;
	resources: Resources;
	mana: ManaData;
	conditions: Array<Condition>;
	identity: Identity;
};

export const DEFAULT_PLAYER_DATA: PlayerData = {
	stats: {
		lives: 9,
		days: 123,
	},
	currencies: {
		Silver: {
			amount: 0,
			multiplier: 1,
		},
		Valu: {
			amount: 0,
			multiplier: 1,
		},
		Insight: {
			amount: 0,
			multiplier: 1,
		},
		Alignment: {
			amount: 0,
			multiplier: 1,
		},
	},
	resources: {
		health: 100,
		stomach: 100,
		toxicity: 0,
		temperature: 50,
	},
	mana: {
		amount: 0,
		enabled: false,
	},
	conditions: [],
	identity: {
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
	},
	// player
	// IsBanned: false,
	// Rebirths: 0,
	// // lineage
	// RaceName: "",
	// Edict: "",
	// HouseName: "",
	// BankedArtifact: "",
	// UnlockIds: [],
	// // character
	// Days: 0,
	// Seconds: 0,
	// Runes: 0,
	// Lives: 3,
	// SnapSlots: 0,
	// ManaProgression: 0,
	// PDDay: 0,
	// GachaDay: 0,
	// HasMadeHouse: false,
	// IsVampire: false,
	// IsHybrid: false,
	// CanHybrid: false,
	// SigilObtained: false,
	// ManaObtained: false,
	// IsLord: false,
	// FirstName: "",
	// PhenotypeName: "",
	// Sex: "",
	// Personality: "",
	// ArmorName: "",
	// Artifact: "",
	// EmulatedSkill: "",
	// Class: "",
	// SubClass: "",
	// BaseClass: "",
	// SuperClass: "",
	// HybridClass: "",
	// UltraClass: "",
	// LastSkill: "",
	// HomeTown: "",
	// Skills: [],
	// Spells: [],
	// Snaps: [],
	// Dye: { R: 0, G: 0, B: 0 },
	// ManaColor: { R: 0, G: 0, B: 0 },
	// // life
	// Health: 100,
	// Stomach: 100,
	// Toxicity: 0,
	// Temperature: 50,
	// HasResGrip: false,
	// Conditions: [],
	// Position: { X: 0, Y: 0, Z: 0 },
	// Direction: { X: 0, Y: 0, Z: 0 },
};
