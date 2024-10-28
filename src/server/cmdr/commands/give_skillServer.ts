import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PlayerServer } from "server/components/player-server";
import { SkillId } from "shared/configs/skills";

export = function (context: CommandContext, player: Player, skillId: SkillId) {
	const components = Dependency<Components>();
	const playerServer = components.getComponent<PlayerServer>(player);
	if (playerServer === undefined)
		return `Could not get PlayerServer on ${player}`;
	const character = playerServer.getCharacter();
	character.learnSkill(skillId);
};
