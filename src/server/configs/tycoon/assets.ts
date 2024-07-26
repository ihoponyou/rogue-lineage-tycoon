import { Currency } from "../../../../types/currency";

export interface AssetConfig {
	readonly displayName: string;
	readonly cost: number;
	readonly currency: Currency;
	readonly prerequisites: Array<string>;
}

export function getAssetConfig(assetName: string): AssetConfig {
	const asset = ASSETS[assetName];
	if (asset === undefined) error(`Asset "${assetName}" does not exist`);
	return asset;
}

export const ASSETS: { [name: string]: AssetConfig } = {
	DoorRocks: {
		displayName: "Break Rocks",
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	Bag: {
		displayName: "Mysterious Bag",
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	SilverDropper: {
		displayName: "Silver Dropper",
		cost: 0,
		currency: "Silver",
		prerequisites: ["Bag"],
	},
	TrinketDropper: {
		displayName: "Trinket Dropper",
		cost: 100,
		currency: "Silver",
		prerequisites: ["SilverDropper"],
	},
	Polisher: {
		displayName: "Product Polisher 9000",
		cost: 100,
		currency: "Silver",
		prerequisites: ["TrinketDropper"],
	},
	Merchant: {
		displayName: "The Merchant",
		cost: 500,
		currency: "Silver",
		prerequisites: ["SilverDropper"],
	},
	Appraiser: {
		displayName: "The Appraiser",
		cost: 350,
		currency: "Silver",
		prerequisites: ["Merchant"],
	},
	ManaRocks: {
		displayName: "Break Rocks",
		cost: 400,
		currency: "Silver",
		prerequisites: [],
	},
	Walls: {
		displayName: "Build Walls",
		cost: 500,
		currency: "Silver",
		prerequisites: ["ManaRocks"],
	},
	WeaponRack: {
		displayName: "Weapon Rack",
		cost: 500,
		currency: "Silver",
		prerequisites: ["ManaRocks"],
	},
	Mana: {
		displayName: "Mana",
		cost: 250,
		currency: "Silver",
		prerequisites: ["ManaRocks"],
	},
	ScrollDropper: {
		displayName: "Scroll Dropper",
		cost: 350,
		currency: "Silver",
		prerequisites: ["Mana"],
	},
	ManaRun: {
		displayName: "Mana Run",
		cost: 500,
		currency: "Silver",
		prerequisites: ["Mana"],
	},
	ManaDash: {
		displayName: "Mana Dash",
		cost: 750,
		currency: "Silver",
		prerequisites: ["ManaRun"],
	},
	ManaClimb: {
		displayName: "Mana Climb",
		cost: 1000,
		currency: "Silver",
		prerequisites: ["ManaDash"],
	},
};
