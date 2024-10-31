import {
	CenturionType,
	Command,
	CommandContext,
	Group,
	Guard,
	Register,
} from "@rbxts/centurion";
import { store } from "server/store";
import isAdmin from "shared/commands/guards/is-admin";

@Register({
	groups: [
		{
			name: "set",
			description: "set something",
		},
	],
})
@Group("set")
@Guard(isAdmin)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SetCommand {
	@Command({
		name: "days",
		description: "set player(s') days",
		arguments: [
			{
				name: "player",
				description: "",
				type: CenturionType.Player,
			},
			{
				name: "days",
				description: "",
				type: CenturionType.Integer,
			},
		],
	})
	setDays(context: CommandContext, player: Player, days: number) {
		store.setDays(player, days);
		context.reply(`Set ${player.Name}'s days to ${days}`);
	}

	@Command({
		name: "lives",
		description: "set player(s') lives",
		arguments: [
			{
				name: "player",
				description: "",
				type: CenturionType.Player,
			},
			{
				name: "lives",
				description: "",
				type: CenturionType.Integer,
			},
		],
	})
	setLives(context: CommandContext, player: Player, lives: number) {
		store.setLives(player, lives);
		context.reply(`Set ${player.Name}'s lives to ${lives}`);
	}

	@Command({
		name: "manaEnabled",
		description: "toggle a player's mana",
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
	setManaEnabled(ctx: CommandContext, player: Player, enable: boolean) {
		store.toggleManaEnabled(player, enable);
		ctx.reply(`${player.Name} no${enable ? "w" : " longer"} has mana`);
	}
}
