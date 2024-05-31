import { Dependency, Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import {
	OnCharacterAdded,
	OnCharacterRemoving,
	OnPlayerAdded,
	OnPlayerRemoving,
	OnRemoved,
} from "../../../../../types/lifecycles";
import { Components } from "@flamework/components";

@Service()
export class LifecycleService implements OnStart {
	// this doesnt survive transpilation into lua
	// private newLifecycleEvent<E>() {
	// 	const listeners = new Set<E>();
	// 	Modding.onListenerAdded<E>((obj) => listeners.add(obj));
	// 	Modding.onListenerRemoved<E>((obj) => listeners.delete(obj));
	// 	return listeners;
	// }

	onStart(): void {
		// const playerAddedListeners = this.newLifecycleEvent<OnPlayerAdded>();
		const playerAddedListeners = new Set<OnPlayerAdded>();
		Modding.onListenerAdded<OnPlayerAdded>((obj) =>
			playerAddedListeners.add(obj),
		);
		Modding.onListenerRemoved<OnPlayerAdded>((obj) =>
			playerAddedListeners.delete(obj),
		);

		const playerRemovingListeners = new Set<OnPlayerRemoving>();
		Modding.onListenerAdded<OnPlayerRemoving>((obj) =>
			playerRemovingListeners.add(obj),
		);
		Modding.onListenerRemoved<OnPlayerRemoving>((obj) =>
			playerRemovingListeners.delete(obj),
		);

		const characterAddedListeners = new Set<OnCharacterAdded>();
		Modding.onListenerAdded<OnCharacterAdded>((obj) =>
			characterAddedListeners.add(obj),
		);
		Modding.onListenerRemoved<OnCharacterAdded>((obj) =>
			characterAddedListeners.delete(obj),
		);

		const characterRemovingListeners = new Set<OnCharacterRemoving>();
		Modding.onListenerAdded<OnCharacterRemoving>((obj) =>
			characterRemovingListeners.add(obj),
		);
		Modding.onListenerRemoved<OnCharacterRemoving>((obj) =>
			characterRemovingListeners.delete(obj),
		);

		Players.PlayerAdded.Connect((player) => {
			for (const listener of playerAddedListeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
			player.CharacterAdded.Connect((character) => {
				for (const otherListener of characterAddedListeners) {
					task.spawn(() =>
						otherListener.onCharacterAdded(
							character as StarterCharacter,
						),
					);
				}
			});
			player.CharacterRemoving.Connect((character) => {
				for (const otherListener of characterRemovingListeners) {
					task.spawn(() =>
						otherListener.onCharacterRemoving(
							character as StarterCharacter,
						),
					);
				}
			});
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of playerAddedListeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
			if (player.Character) {
				for (const listener of characterAddedListeners) {
					task.spawn(() =>
						listener.onCharacterAdded(
							player.Character as StarterCharacter,
						),
					);
				}
			}
		}

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of playerRemovingListeners) {
				task.spawn(() => listener.onPlayerRemoving(player));
			}
		});

		const components = Dependency<Components>();

		components.onComponentRemoved<OnRemoved>((value) => {
			value.onRemoved();
		});
	}
}
