import { Currency } from "../../../../../types/currency";

export type Sex = "Male" | "Female";

export interface SerializedVector {
	X: number | 0;
	Y: number | 0;
	Z: number | 0;
}

export interface SerializedColor3 {
	R: number;
	G: number;
	B: number;
}

export interface CurrencyData {
	amount: number;
	multiplier: number;
}

const DEFAULT_CURRENCY_DATA: CurrencyData = {
	amount: 0,
	multiplier: 1,
};

export type PlayerCurrencyData = Record<Currency, CurrencyData>;

export type PlayerData = {
	stats: PlayerStats;
	currency: PlayerCurrencyData;

	Conditions: Array<string>;
	Health: number;
	Stomach: number;
	Toxicity: number;
	Temperature: number;
	Position: SerializedVector;
	Direction: SerializedVector;

	HasResGrip: boolean;
	HasMadeHouse: boolean;
	IsVampire: boolean;
	IsLord: boolean;

	FirstName: string;
	PhenotypeName: string;
	Sex: Sex | "";
	Personality: string;
	ArmorName: string;
	Artifact: string;
	EmulatedSkill: string;
	Dye: SerializedColor3;
	Days: number;
	Seconds: number;
	Runes: number;
	Lives: number;

	Class: string;
	SubClass: string;
	BaseClass: string;
	SuperClass: string;
	HybridClass: string;
	UltraClass: string;
	LastSkill: string;
	Skills: Array<string>;
	IsHybrid: boolean;
	CanHybrid: boolean;
	SigilObtained: boolean;

	Spells: Array<string>;
	Snaps: Array<string>;
	ManaColor: SerializedColor3;
	ManaObtained: boolean;
	SnapSlots: number;
	ManaProgression: number;

	HomeTown: string;
	IsBanned: boolean;
	PDDay: number;
	GachaDay: number;

	RaceName: string;
	Edict: string;
	HouseName: string;
	BankedArtifact: string;

	UnlockIds: Array<string>;
	Rebirths: number;
};

export const DEFAULT_PLAYER_DATA: PlayerData = {
	stats: {
		lives: 9,
		days: 123,
	},
	currency: {
		Silver: DEFAULT_CURRENCY_DATA,
		Valu: DEFAULT_CURRENCY_DATA,
		Insight: DEFAULT_CURRENCY_DATA,
		Alignment: DEFAULT_CURRENCY_DATA,
	},
	// player
	IsBanned: false,
	Rebirths: 0,
	// lineage
	RaceName: "",
	Edict: "",
	HouseName: "",
	BankedArtifact: "",
	UnlockIds: [],
	// character
	Days: 0,
	Seconds: 0,
	Runes: 0,
	Lives: 3,
	SnapSlots: 0,
	ManaProgression: 0,
	PDDay: 0,
	GachaDay: 0,
	HasMadeHouse: false,
	IsVampire: false,
	IsHybrid: false,
	CanHybrid: false,
	SigilObtained: false,
	ManaObtained: false,
	IsLord: false,
	FirstName: "",
	PhenotypeName: "",
	Sex: "",
	Personality: "",
	ArmorName: "",
	Artifact: "",
	EmulatedSkill: "",
	Class: "",
	SubClass: "",
	BaseClass: "",
	SuperClass: "",
	HybridClass: "",
	UltraClass: "",
	LastSkill: "",
	HomeTown: "",
	Skills: [],
	Spells: [],
	Snaps: [],
	Dye: { R: 0, G: 0, B: 0 },
	ManaColor: { R: 0, G: 0, B: 0 },
	// life
	Health: 100,
	Stomach: 100,
	Toxicity: 0,
	Temperature: 50,
	HasResGrip: false,
	Conditions: [],
	Position: { X: 0, Y: 0, Z: 0 },
	Direction: { X: 0, Y: 0, Z: 0 },
};

export interface PlayerStats {
	readonly lives: number;
	readonly days: number;
}
