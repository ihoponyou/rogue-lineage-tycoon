import { store } from "server/store";

interface SkillConfig {
	readonly teach: (player: Player) => void;
}

export function getSkillConfig(name: string): SkillConfig {
	const skill = SKILLS[name];
	if (skill === undefined) error(`Skill "${name}" does not exist`);
	return skill;
}

export const SKILLS: { [name: string]: SkillConfig } = {
	Mana: {
		teach: (player) => {
			player.AddTag("Mana");
		},
	},
	ManaRun: {
		teach: (player) => {
			store.toggleManaRunEnabled(player, true);
		},
	},
	ManaDash: {
		teach: (player) => {
			store.toggleManaDashEnabled(player, true);
		},
	},
	ManaClimb: {
		teach: (player) => {
			store.toggleManaClimbEnabled(player, true);
		},
	},
};
