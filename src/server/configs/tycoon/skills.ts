import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { Equippable } from "server/components/equippable";
import { Ownable } from "server/components/ownable";
import { PlayerServer } from "server/components/player-server";
import { UseableServer } from "server/components/useable-server";
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

			tool.AddTag(Equippable.TAG);
			tool.AddTag(Ownable.TAG);
			tool.AddTag(UseableServer.TAG);

			const components = Dependency<Components>();

			const ownable = components.waitForComponent<Ownable>(tool).expect();
			const playerServer = components
				.waitForComponent<PlayerServer>(player)
				.expect();

			ownable.setOwner(playerServer);

			print(tool, "was here");

			store.giveTool(player, tool);
		},
	},
};
