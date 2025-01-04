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
class KnockCommand {
	@Command({
		name: "knock",
		arguments: [
			{
				name: "player",
				description: "the player to knock",
				type: CenturionType.Player,
			},
		],
	})
	knock(ctx: CommandContext, player: Player) {
		try {
			const components = Modding.resolveSingleton(Components);
			const playerServer = components
				.waitForComponent<PlayerServer>(player)
				.expect();
			playerServer.getPlayerCharacter().getCharacter().knock();
			ctx.reply(`Knocked ${player.Name}`);
		} catch (err) {
			ctx.error(tostring(err));
		}
	}
}
