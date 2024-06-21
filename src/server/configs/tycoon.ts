import { ReplicatedStorage } from "@rbxts/services";
import { Currency } from "../../../types/currency";

interface AssetConfig {
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

const PRODUCT_MODELS = ReplicatedStorage.Assets.Tycoon.Products;

export const ASSETS: { [name: string]: AssetConfig } = {
	Door: {
		cost: 0,
		currency: "Silver",
		prerequisites: [],
	},
	Walls: {
		cost: 25000,
		currency: "Silver",
		prerequisites: ["Door"],
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
