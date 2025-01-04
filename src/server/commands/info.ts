import { Modding } from "@flamework/core";
import {
	CenturionType,
	Command,
	CommandContext,
	Group,
	Guard,
	Register,
} from "@rbxts/centurion";
import { DataService } from "server/services/data-service";
import isAdmin from "shared/commands/guards/is-admin";

@Register({
	groups: [
		{
			name: "info",
			description: "retrieve data about something",
		},
	],
})
@Group("info")
@Guard(isAdmin)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class InfoCommand {
	@Command({
		name: "profile",
		description: "print out a player's ProfileService profile",
		arguments: [
			{
				name: "player",
				description: ":)",
				type: CenturionType.Player,
			},
		],
	})
	infoProfile(ctx: CommandContext, player: Player) {
		const dataService = Modding.resolveSingleton(DataService);
		try {
			print(dataService.getProfile(player));
			ctx.reply(`Printed profile of ${player.Name} to console`);
		} catch (err) {
			ctx.error(tostring(err));
		}
	}
}
