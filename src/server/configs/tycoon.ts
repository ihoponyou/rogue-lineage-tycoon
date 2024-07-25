import { ReplicatedStorage } from "@rbxts/services";
import { Currency } from "../../../types/currency";

export interface AssetConfig {
	readonly cost: number;
	readonly currency: Currency;
	readonly prerequisites: Array<string>;
}

interface DropperConfig {
	readonly dropsPerSecond: number;
	readonly productsPerDrop: number;
	readonly productModels: Array<Model>;
}

interface ProductConfig {
	readonly currency: Currency;
	readonly value: number;
}

interface UpgraderConfig {
	readonly multiplier: number;
}

const PRODUCT_MODELS = ReplicatedStorage.Assets.Tycoon.Products;

export function getAssetConfig(assetName: string): AssetConfig {
	const asset = ASSETS[assetName];
	if (asset === undefined) error(`Asset "${assetName}" does not exist`);
	return asset;
}

export const ASSETS: { [name: string]: AssetConfig } = {
	Walls: {
		cost: 0,
		currency: "Silver",
		prerequisites: ["ManaRocks"],
	},
	SilverDropper: {
		cost: 0,
		currency: "Silver",
		prerequisites: ["Bag"],
	},
	Bag: {
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	ManaRocks: {
		cost: 0,
		currency: "Silver",
		prerequisites: ["TrinketDropper", "Polisher"],
	},
	Mana: {
		cost: 10,
		currency: "Silver",
		prerequisites: ["Walls", "ManaRocks"],
	},
	ManaRun: {
		cost: 150,
		currency: "Silver",
		prerequisites: ["Mana"],
	},
	ManaDash: {
		cost: 250,
		currency: "Silver",
		prerequisites: ["ManaRun"],
	},
	ManaClimb: {
		cost: 500,
		currency: "Silver",
		prerequisites: ["ManaDash"],
	},
	DoorRocks: {
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	ScrollDropper: {
		cost: 250,
		currency: "Silver",
		prerequisites: ["Mana"],
	},
	TrinketDropper: {
		cost: 100,
		currency: "Silver",
		prerequisites: ["SilverDropper"],
	},
	Polisher: {
		cost: 100,
		currency: "Silver",
		prerequisites: ["TrinketDropper"],
	},
	Appraiser: {
		cost: 100,
		currency: "Silver",
		prerequisites: ["Merchant"],
	},
	Merchant: {
		cost: 1000,
		currency: "Silver",
		prerequisites: ["SilverDropper"],
	},
};

export const PRODUCTS: { [name: string]: ProductConfig } = {
	shilling: {
		currency: "Silver",
		value: 1,
	},
	"???": {
		currency: "Silver",
		value: 50,
	},
	Diamond: {
		currency: "Silver",
		value: 35,
	},
	Ruby: {
		currency: "Silver",
		value: 14,
	},
	Emerald: {
		currency: "Silver",
		value: 14,
	},
	Sapphire: {
		currency: "Silver",
		value: 14,
	},
	Opal: {
		currency: "Silver",
		value: 9,
	},
	"Idol of the Forgotten": {
		currency: "Silver",
		value: 8,
	},
	Amulet: {
		currency: "Silver",
		value: 7,
	},
	Ring: {
		currency: "Silver",
		value: 7,
	},
	"Old Amulet": {
		currency: "Silver",
		value: 6,
	},
	"Old Ring": {
		currency: "Silver",
		value: 6,
	},
	Goblet: {
		currency: "Silver",
		value: 5,
	},
	Scroll: {
		currency: "Silver",
		value: 15,
	},
	Godscroll: {
		currency: "Silver",
		value: 50,
	},
};

export const DROPPERS: { [name: string]: DropperConfig } = {
	SilverDropper: {
		dropsPerSecond: 3,
		productsPerDrop: 1,
		productModels: [PRODUCT_MODELS.shilling],
	},
	TrinketDropper: {
		dropsPerSecond: 1,
		productsPerDrop: 1,
		productModels: [
			PRODUCT_MODELS["???"],
			PRODUCT_MODELS.Diamond,
			PRODUCT_MODELS.Ruby,
			PRODUCT_MODELS.Emerald,
			PRODUCT_MODELS.Sapphire,
			PRODUCT_MODELS.Opal,
			PRODUCT_MODELS["Idol of the Forgotten"],
			PRODUCT_MODELS.Amulet,
			PRODUCT_MODELS.Ring,
			PRODUCT_MODELS["Old Amulet"],
			PRODUCT_MODELS["Old Ring"],
			PRODUCT_MODELS.Goblet,
		],
	},
	ScrollDropper: {
		dropsPerSecond: 0.5,
		productsPerDrop: 1,
		productModels: [PRODUCT_MODELS.Scroll, PRODUCT_MODELS.Godscroll],
	},
};

export const UPGRADERS: { [name: string]: UpgraderConfig } = {
	Polisher: {
		multiplier: 1.25,
	},
	Appraiser: {
		multiplier: 1.5,
	},
};
