export enum WeaponType {
	Sword = "Sword",
	Spear = "Spear",
	Dagger = "Dagger",
}

interface WeaponConfig {
	type: WeaponType;
	damage: number;
}

export const WEAPONS: { [name: string]: WeaponConfig } = {
	"Bronze Sword": {
		type: WeaponType.Sword,
		damage: -5,
	},
};

export function getWeaponConfig(name: string): WeaponConfig {
	const config = WEAPONS[name];
	if (config === undefined) {
		error(`Weapn ${name} does not exist`);
	}
	return config;
}
