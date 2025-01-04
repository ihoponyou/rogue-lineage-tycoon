import { AttackData } from "server/modules/attack-data";

export const MINIMUM_TEMPERATURE = 0;
export const MAXIMUM_TEMPERATURE = 100;
export const LIGHT_ATTACK_DATA: AttackData = {
	ragdollDuration: 0,
	knockbackForce: 15,
	knockbackDuration: 1 / 6,
	breaksBlock: false,
};
export const LAST_LIGHT_ATTACK_DATA: AttackData = {
	ragdollDuration: 1,
	knockbackForce: 35,
	knockbackDuration: 0.5,
	breaksBlock: false,
};
