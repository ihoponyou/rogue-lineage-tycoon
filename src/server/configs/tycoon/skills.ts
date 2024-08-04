import { store } from "server/store";

interface SkillConfig {
	readonly teach: (player: Player) => void;
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
