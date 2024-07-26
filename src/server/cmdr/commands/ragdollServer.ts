import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { RagdollServer } from "server/components/character/ragdoll-server";

export = function (context: CommandContext, player: Player, enable: boolean) {
	const components = Dependency<Components>();
	const character = player.Character;
	if (character === undefined)
		return `${player.Name} does not have a character`;
	const ragdoll = components.getComponent<RagdollServer>(character);
	if (ragdoll === undefined)
		return `${player.Name} does not have a character component`;
	ragdoll.toggle(enable);
};
