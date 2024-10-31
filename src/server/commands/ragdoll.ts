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
class RagdollCommand {
	@Command({
		name: "ragdoll",
		description: "toggle a player character's ragdoll",
		arguments: [
			{
				name: "player",
				description: ":)",
				type: CenturionType.Player,
			},
			{
				name: "enable",
				description: "to toggle or not to toggle",
				type: CenturionType.Boolean,
			},
		],
	})
	ragdoll(ctx: CommandContext, player: Player, enable: boolean) {
		const components = Modding.resolveSingleton(Components);
		try {
			const playerServer = components
				.waitForComponent<PlayerServer>(player)
				.expect();
			playerServer
				.getPlayerCharacter()
				.getCharacter()
				.toggleRagdoll(enable);
			ctx.reply(`${enable ? "R" : "Unr"}agdolled ${player.Name}`);
		} catch (err) {
			ctx.error(tostring(err));
		}
	}
}
