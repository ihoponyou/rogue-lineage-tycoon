import { Components } from "@flamework/components";
import { Modding } from "@flamework/core";
import {
	CenturionType,
	Command,
	CommandContext,
	Guard,
	Register,
} from "@rbxts/centurion";
import { PlayerServer } from "server/components/player-server";
import isAdmin from "shared/commands/guards/is-admin";

@Register()
@Guard(isAdmin)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SnipeCommand {
	@Command({
		name: "snipe",
		description: "snipe a player(s') character",
		arguments: [
			{
				name: "player",
				description: ":)",
				type: CenturionType.Player,
			},
		],
	})
	ragdoll(context: CommandContext, player: Player) {
		const components = Modding.resolveSingleton(Components);
		try {
			const playerServer = components
				.waitForComponent<PlayerServer>(player)
				.expect();
			playerServer.getCharacter().snipe();
			context.reply(`Sniped ${player.Name}`);
		} catch (err) {
			context.error(tostring(err));
		}
	}
}
