import { Flamework } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { AbstractWeapon } from "shared/components/abstract-weapon";
import { cframeFromOrientationDeg } from "shared/modules/cframe-util";

export enum R6BodyPart {
	RightArm = "Right Arm",
	Torso = "Torso",
}

export interface ItemConfig {
	readonly tags: ReadonlyArray<string>;
	readonly droppable: boolean;
	readonly maxQuantity: number;
	readonly worldModel: Model;
	readonly hideOnHolster: boolean;
	readonly equipLimb: R6BodyPart;
	readonly equipC0?: CFrame;
	readonly holsterLimb: R6BodyPart;
	readonly holsterC0?: CFrame;
	readonly idleAnimation?: Animation;
}

const SWORD_HOLSTER_C0 = new CFrame(0, 0, 0.552).mul(
	cframeFromOrientationDeg(28.695, -90, -90),
);

export const ITEMS = {
	Goblet: {
		tags: [],
		droppable: true,
		maxQuantity: 99,
		worldModel: ReplicatedStorage.Assets.Tycoon.Products.Goblet,
		hideOnHolster: true,
		equipLimb: R6BodyPart.RightArm,
		holsterLimb: R6BodyPart.RightArm,
	},
	"Bronze Sword": {
		tags: [AbstractWeapon.TAG],
		droppable: false,
		maxQuantity: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Sword"],
		hideOnHolster: false,
		equipLimb: R6BodyPart.RightArm,
		equipC0: new CFrame(0, 0, -1.85).mul(cframeFromOrientationDeg(-90, 90)),
		holsterLimb: R6BodyPart.Torso,
		holsterC0: SWORD_HOLSTER_C0,
	},
	"Bronze Spear": {
		tags: [AbstractWeapon.TAG],
		droppable: false,
		maxQuantity: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Spear"],
		hideOnHolster: false,
		equipLimb: R6BodyPart.RightArm,
		equipC0: new CFrame(0, 0, -2).mul(cframeFromOrientationDeg(90, -90, 0)),
		holsterLimb: R6BodyPart.Torso,
		holsterC0: new CFrame(0, 0, 0.65).mul(
			cframeFromOrientationDeg(25, -90, -90),
		),
		idleAnimation: ReplicatedStorage.Assets.Animations.Combat.SpearIdle,
	},
	"Bronze Dagger": {
		tags: [AbstractWeapon.TAG],
		droppable: false,
		maxQuantity: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Dagger"],
		hideOnHolster: true,
		equipLimb: R6BodyPart.RightArm,
		equipC0: new CFrame(0, 0.25, 0.8).mul(
			cframeFromOrientationDeg(0, 0, -90),
		),
		holsterLimb: R6BodyPart.Torso,
	},
	test_tool: {
		tags: [],
		droppable: false,
		maxQuantity: 1,
		worldModel: ReplicatedStorage.Assets.Models.test_tool,
		hideOnHolster: true,
		equipLimb: R6BodyPart.RightArm,
		holsterLimb: R6BodyPart.Torso,
	},
};

export type ItemId = keyof typeof ITEMS;

export const isItemId = Flamework.createGuard<ItemId>();

export function getItemConfig(name: ItemId): ItemConfig {
	const config: ItemConfig = ITEMS[name];
	if (config === undefined) error(`Item "${name}" does not exist`);
	return config;
}
