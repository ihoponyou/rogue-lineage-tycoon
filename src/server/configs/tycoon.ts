import { ReplicatedStorage } from "@rbxts/services";
import { Currency } from "../../../types/currency";

export interface AssetConfig {
	cost: number;
	currency: Currency;
	prerequisites: Array<string>;
}

interface DropperConfig {
	dropsPerSecond: number;
	productsPerDrop: number;
	productModel: Model;
}

interface ProductConfig {
	currency: Currency;
	value: number;
}

interface UpgraderConfig {
	multiplier: number;
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
};

export const DROPPERS: { [name: string]: DropperConfig } = {
	SilverDropper: {
		dropsPerSecond: 5,
		productsPerDrop: 1,
		productModel: PRODUCT_MODELS.shilling,
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
