import { Controller, Modding, OnStart } from "@flamework/core";
import { LOCAL_PLAYER } from "client/configs/constants";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "shared/modules/lifecycles";

@Controller()
export class LifecycleController implements OnStart {
	public onStart(): void {
		const localCharacterAddedListeners = new Set<OnLocalCharacterAdded>();
		Modding.onListenerAdded<OnLocalCharacterAdded>((obj) =>
			localCharacterAddedListeners.add(obj),
		);
		Modding.onListenerRemoved<OnLocalCharacterAdded>((obj) =>
			localCharacterAddedListeners.delete(obj),
		);

		const localCharacterRemovingListeners =
			new Set<OnLocalCharacterRemoving>();
		Modding.onListenerAdded<OnLocalCharacterRemoving>((obj) =>
			localCharacterRemovingListeners.add(obj),
		);
		Modding.onListenerRemoved<OnLocalCharacterRemoving>((obj) =>
			localCharacterRemovingListeners.delete(obj),
		);

		LOCAL_PLAYER.CharacterAdded.Connect((character) => {
			for (const listener of localCharacterAddedListeners) {
				task.spawn(() => listener.onLocalCharacterAdded(character));
			}
		});

		if (LOCAL_PLAYER.Character) {
			for (const listener of localCharacterAddedListeners) {
				task.spawn(() =>
					listener.onLocalCharacterAdded(
						LOCAL_PLAYER.Character as Model,
					),
				);
			}
		}

		LOCAL_PLAYER.CharacterRemoving.Connect((character) => {
			for (const listener of localCharacterRemovingListeners) {
				task.spawn(() => listener.onLocalCharacterRemoving(character));
			}
		});
	}
}
