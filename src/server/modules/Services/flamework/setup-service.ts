import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

export interface OnPlayerAdded {
	onPlayerAdded(player: Player): void;
}

@Service({
	loadOrder: 0,
})
export class SetupService implements OnStart {
	onStart(): void {
		const listeners = new Set<OnPlayerAdded>();

		Modding.onListenerAdded<OnPlayerAdded>((obj) => listeners.add(obj));
		Modding.onListenerRemoved<OnPlayerAdded>((obj) => listeners.delete(obj));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		}
	}
}
