import { store } from "server/store";

interface SkillConfig {
	readonly teach: (player: Player) => void;
}

export function getSkillConfig(name: string): SkillConfig {
	const skill = SKILLS[name];
	if (skill === undefined) error(`Skill "${name}" does not exist`);
	return skill;
}

// active skills function like items with cooldowns; weapons
// active skills should use a tool to activate to be compatible with inventory
// 		on teach, give the player a tool that activates the skill
// 		when skill tool is equipped, rig a corresponding model if needed

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

	// warrior
	["Pommel Strike"]: {
		teach: (player) => {
			print(`${player.Name} learned Pommel Strike!`);

			const tool = new Instance("Tool");
			tool.Name = "test_tool";
			tool.Parent = player;

			tool.AddTag("Equippable");
			tool.AddTag("Ownable");

			print(tool, "was here");

			store.giveTool(player, tool);
		},
	},
};
