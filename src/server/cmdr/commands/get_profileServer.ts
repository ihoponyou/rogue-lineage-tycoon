import { CommandContext } from "@rbxts/cmdr";
import { store } from "server/store";

export = function (_context: CommandContext, player: Player) {
	const profile = store.getState().get(tostring(player.UserId));
	if (profile === undefined) return "Profile not found";
	print(profile);
	return "Printed to console";
};
