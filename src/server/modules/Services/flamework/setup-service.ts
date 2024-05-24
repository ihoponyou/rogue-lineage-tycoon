import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { OnPlayerAdded, OnPlayerRemoving } from "../../../../../types/lifecycles";

@Service()
export class SetupService implements OnStart {
	onStart(): void {
		const listeners = new Set<OnPlayerAdded>();
		Modding.onListenerAdded<OnPlayerAdded>((obj) => listeners.add(obj));
		Modding.onListenerRemoved<OnPlayerAdded>((obj) => listeners.delete(obj));

		const playerRemovingListeners = new Set<OnPlayerRemoving>();
		Modding.onListenerAdded<OnPlayerRemoving>((obj) => playerRemovingListeners.add(obj));
		Modding.onListenerRemoved<OnPlayerRemoving>((obj) => playerRemovingListeners.delete(obj));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of playerRemovingListeners) {
				task.spawn(() => listener.onPlayerRemoving(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		}
	}
}
