import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { SoundService, StarterGui } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { App } from "client/gui/components/app";
import { Events } from "client/networking";
import { store } from "client/store";
import { selectCurrencies } from "shared/store/slices/currencies/selectors";

@Controller()
export class GuiController implements OnStart {
	private playerGui = LOCAL_PLAYER.WaitForChild("PlayerGui");
	private root = createRoot(new Instance("Folder"));

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
				<ReflexProvider producer={store}>
					{createPortal(<App />, this.playerGui)}
				</ReflexProvider>
			</StrictMode>,
		);
	}
}
