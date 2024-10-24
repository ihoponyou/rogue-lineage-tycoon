import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { PlayerServer } from "server/components/player-server";

export = function (context: CommandContext, player: Player, skillName: string) {
	const components = Dependency<Components>();
	const playerServer = components.getComponent<PlayerServer>(player);
	if (playerServer === undefined)
		return `Could not get PlayerServer on ${player}`;
	return "not implemented";
	// playerServer.teach(skillName);
};
