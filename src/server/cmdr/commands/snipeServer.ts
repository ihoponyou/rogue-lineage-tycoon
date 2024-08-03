import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { CommandContext } from "@rbxts/cmdr";
import { Character } from "server/components/character";

export = function (context: CommandContext, player: Player) {
	const components = Dependency<Components>();
	const character = player.Character;
	if (character === undefined)
		return `${player.Name} does not have a character`;
	const characterServer = components.getComponent<Character>(character);
	if (characterServer === undefined)
		return `${player.Name} does not have a character component`;
	characterServer.snipe();
};
