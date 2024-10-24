import { ReplicatedStorage } from "@rbxts/services";

export type BodyPart = "Right Arm" | "Torso" | "Right Leg";

interface ItemConfig {
	readonly droppable: boolean;
	readonly maxStackSize: number;
	readonly worldModel: Model;
	readonly hideOnHolster: boolean;
	readonly equipLimb: BodyPart;
	readonly equipC0?: CFrame;
	readonly holsterLimb: BodyPart;
	readonly holsterC0?: CFrame;
	readonly idleAnimation?: Animation;
}

function cframeFromOrientationDeg(
	x: number = 0,
	y: number = 0,
	z: number = 0,
): CFrame {
	return CFrame.fromOrientation(math.rad(x), math.rad(y), math.rad(z));
}

const SWORD_HOLSTER_C0 = new CFrame(0, 0, 0.552).mul(
	cframeFromOrientationDeg(28.695, -90, -90),
);

export const ITEMS: { [name: string]: ItemConfig } = {
	Goblet: {
		droppable: true,
		maxStackSize: 99,
		worldModel: ReplicatedStorage.Assets.Tycoon.Products.Goblet,
		hideOnHolster: true,
		equipLimb: "Right Arm",
		holsterLimb: "Right Arm",
	},
	"Bronze Sword": {
		droppable: false,
		maxStackSize: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Sword"],
		hideOnHolster: false,
		equipLimb: "Right Arm",
		equipC0: new CFrame(0, -1, -1.75).mul(
			cframeFromOrientationDeg(-90, 90),
		),
		holsterLimb: "Torso",
		holsterC0: SWORD_HOLSTER_C0,
	},
	"Bronze Spear": {
		droppable: false,
		maxStackSize: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Spear"],
		hideOnHolster: false,
		equipLimb: "Right Arm",
		holsterLimb: "Torso",
		holsterC0: new CFrame(0, 0, 0.65).mul(
			cframeFromOrientationDeg(25, -90, -90),
		),
		idleAnimation: ReplicatedStorage.Assets.Animations.Combat.SpearIdle,
	},
	"Bronze Dagger": {
		droppable: false,
		maxStackSize: 1,
		worldModel: ReplicatedStorage.Assets.Models.Weapons["Bronze Dagger"],
		hideOnHolster: true,
		equipLimb: "Right Arm",
		equipC0: new CFrame(0, -0.75, 0.97).mul(
			cframeFromOrientationDeg(0, 0, -90),
		),
		holsterLimb: "Torso",
	},
};

export function getItemConfig(name: string): ItemConfig {
	const config = ITEMS[name];
	if (config === undefined) error(`Item "${name}" does not exist`);
	return config;
}
