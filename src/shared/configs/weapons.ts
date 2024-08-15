import { ReplicatedStorage } from "@rbxts/services";

export enum WeaponType {
	Sword = "Sword",
	Spear = "Spear",
	Dagger = "Dagger",
	Fists = "Fists",
}

export interface WeaponConfig {
	readonly type: WeaponType;
	readonly damage: number;
	readonly lightAttackCooldown: number;
	readonly noJumpDuration: number;
	readonly endlag: number;
	readonly maxLightAttacks: number;
	readonly hitboxSize: Vector3;
	readonly blockAnimation?: Animation;
}

export const WEAPONS: { [name: string]: WeaponConfig } = {
	Fists: {
		type: WeaponType.Fists,
		damage: 6,
		lightAttackCooldown: 0.475,
		noJumpDuration: 0.7,
		endlag: 0.5,
		maxLightAttacks: 5,
		hitboxSize: new Vector3(6, 7, 6),
	},
	"Bronze Sword": {
		type: WeaponType.Sword,
		damage: -9,
		lightAttackCooldown: 0.55,
		noJumpDuration: 0.96,
		endlag: 0.6,
		maxLightAttacks: 5,
		hitboxSize: new Vector3(7, 7, 6),
		blockAnimation: ReplicatedStorage.Assets.Animations.Combat.SwordBlock,
	},
	"Bronze Spear": {
		type: WeaponType.Spear,
		damage: 8,
		lightAttackCooldown: 0.4675,
		noJumpDuration: 1,
		endlag: 0.75,
		maxLightAttacks: 4,
		hitboxSize: new Vector3(6, 7, 8),
		blockAnimation: ReplicatedStorage.Assets.Animations.Combat.SpearBlock,
	},
	"Bronze Dagger": {
		type: WeaponType.Dagger,
		damage: 2,
		lightAttackCooldown: 0.3,
		noJumpDuration: 1,
		endlag: 0.75,
		maxLightAttacks: 5,
		hitboxSize: new Vector3(6, 7, 7),
	},
};

export function getWeaponConfig(name: string): WeaponConfig {
	const config = WEAPONS[name];
	if (config === undefined) {
		error(`Weapon ${name} does not exist`);
	}
	return config;
}
