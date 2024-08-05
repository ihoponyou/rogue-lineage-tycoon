import { Players } from "@rbxts/services";

export function onThisPlayerRemoving(
	player: Player,
	callback: (player: Player) => void,
) {
	const connection = Players.PlayerRemoving.Connect((leavingPlayer) => {
		if (player !== leavingPlayer) return;
		callback(leavingPlayer);
		connection.Disconnect();
	});
}
