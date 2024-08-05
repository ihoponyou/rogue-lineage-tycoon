import { ReplicatedStorage } from "@rbxts/services";

interface ItemConfig {
	droppable: boolean;
	maxStackSize: number;
	worldModel: Model;
}

export const ITEMS: { [name: string]: ItemConfig } = {
	Goblet: {
		droppable: true,
		maxStackSize: 99,
		worldModel: ReplicatedStorage.Assets.Tycoon.Products.Goblet,
	},
};

export function getItemConfig(name: string): ItemConfig {
	const config = ITEMS[name];
	if (config === undefined) error(`Item "${name}" does not exist`);
	return config;
}
