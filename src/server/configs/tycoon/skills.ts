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
			print(`${player} got mana run`);
		},
	},
	ManaDash: {
		teach: (player) => {
			print(`${player} got mana dash`);
		},
	},
	ManaClimb: {
		teach: (player) => {
			print(`${player} got mana climb`);
		},
	},
};
