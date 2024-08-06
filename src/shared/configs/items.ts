import { ReplicatedStorage } from "@rbxts/services";

export type BodyPart = "Right Arm" | "Torso";

interface ItemConfig {
	droppable: boolean;
	maxStackSize: number;
	worldModel: Model;
	hideOnHolster: boolean;
	equipLimb: BodyPart;
	equipC0?: CFrame;
	holsterLimb: BodyPart;
	holsterC0?: CFrame;
}

function cframeFromOrientationDeg(
	x: number = 0,
	y: number = 0,
	z: number = 0,
): CFrame {
	return CFrame.fromOrientation(math.rad(x), math.rad(y), math.rad(z));
}

export const DEFAULT_ROOT_JOINT_C0 = new CFrame(0, -1, 0).mul(
	cframeFromOrientationDeg(-90),
);

const SWORD_HOLSTER_C0 = new CFrame(0, 0, 0.552).mul(
	cframeFromOrientationDeg(28.695, -90.001, -90),
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
};

export function getItemConfig(name: string): ItemConfig {
	const config = ITEMS[name];
	if (config === undefined) error(`Item "${name}" does not exist`);
	return config;
}
