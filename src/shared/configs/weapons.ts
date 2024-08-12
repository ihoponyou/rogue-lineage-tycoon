export enum WeaponType {
	Sword = "Sword",
	Spear = "Spear",
	Dagger = "Dagger",
	Fists = "Fists",
}

export interface WeaponConfig {
	readonly type: WeaponType;
	readonly damage: number;
}

export const WEAPONS: { [name: string]: WeaponConfig } = {
	Fists: {
		type: WeaponType.Fists,
		damage: 6,
	},
	"Bronze Sword": {
		type: WeaponType.Sword,
		damage: -5,
	},
};

export function getWeaponConfig(name: string): WeaponConfig {
	const config = WEAPONS[name];
	if (config === undefined) {
		error(`Weapon ${name} does not exist`);
	}
	return config;
}
