import { ReplicatedStorage } from "@rbxts/services";

interface DropperConfig {
	readonly dropsPerSecond: number;
	readonly productsPerDrop: number;
	readonly productModels: Array<Model>;
}

const PRODUCT_MODELS = ReplicatedStorage.Assets.Tycoon.Products;

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
