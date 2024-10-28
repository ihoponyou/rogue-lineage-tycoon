import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import {
	ContextActionService,
	SoundService,
	StarterGui,
} from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/configs/constants";
import { Events } from "client/network";
import { store } from "client/store";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { App } from "client/ui/components/app";
import { singletonsContext } from "client/ui/context";
import { selectCurrencies } from "shared/store/slices/currencies/selectors";
import { CharacterController } from "./character-controller";

@Controller()
export class GuiController implements OnStart {
	private root = createRoot(new Instance("Folder"));

	constructor(
		private components: Components,
		private characterController: CharacterController,
	) {}

	public onStart() {
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Health, false);
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.EmotesMenu, false);
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false);
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);

		store.subscribe(selectCurrencies(), (state, previousState) => {
			if (state?.Silver.amount !== previousState?.Silver.amount)
				SoundService.PlayLocalSound(SoundService.SilverChange);
		});

		Events.dialogue.open.connect((speakerName, text, options) => {
			store.setDialogueText(text);
			store.setDialogueOptions(options);
			store.setSpeakerName(speakerName);
		});
		Events.dialogue.close.connect(() => {
			store.setDialogueText("");
			store.setDialogueOptions([]);
			store.setSpeakerName("");
		});
		this.root.render(
			<StrictMode>
				<singletonsContext.Provider
					value={{
						character: this.characterController,
						components: this.components,
					}}
				></singletonsContext.Provider>
				<ReflexProvider producer={store}>
					{createPortal(<App />, LOCAL_PLAYER_GUI)}
				</ReflexProvider>
			</StrictMode>,
		);

		this.bindToggleBackpack();
	}

	private bindToggleBackpack(): void {
		ContextActionService.BindAction(
			"toggle_backpack_open",
			(_, state) => {
				if (state !== Enum.UserInputState.Begin) {
					return Enum.ContextActionResult.Pass;
				}
				const currentlyOpen = store.getState(selectIsBackpackOpen());
				store.toggleBackpackOpen(!currentlyOpen);

				return Enum.ContextActionResult.Pass;
			},
			true,
			Enum.KeyCode.Backquote,
		);
	}

	private bindHotbarSlot(slot: number): void {
		// get key associated with slot
		// bind an action to that key which will equip/unequip whatever is at that slot
	}
}
