import { Condition } from "shared/configs/conditions";
import { Currencies, DEFAULT_CURRENCY_DATA } from "./currencies";
import { DEFAULT_IDENTITY, Identity } from "./identity";
import { DEFAULT_MANA_DATA, ManaData } from "./mana";
import { DEFAULT_RESOURCES, Resources } from "./resources";
import { DEFAULT_STATS, Stats } from "./stats";
import { DEFAULT_TRANSFORM_DATA, TransformData } from "./transform";

export type PlayerData = {
	stats: Stats;
	currencies: Currencies;
	resources: Resources;
	mana: ManaData;
	conditions: Array<Condition>;
	identity: Identity;
	transform: TransformData;
};

export const DEFAULT_PLAYER_DATA: PlayerData = {
	stats: DEFAULT_STATS,
	currencies: DEFAULT_CURRENCY_DATA,
	resources: DEFAULT_RESOURCES,
	mana: DEFAULT_MANA_DATA,
	conditions: [],
	identity: DEFAULT_IDENTITY,
	transform: DEFAULT_TRANSFORM_DATA,
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
