import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { SoundService } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { App } from "client/gui/components/app";
import { store } from "client/store";
import { selectCurrencies } from "shared/store/slices/players/slices/currencies/selectors";

@Controller()
export class GuiController implements OnStart {
	private playerGui = LOCAL_PLAYER.WaitForChild("PlayerGui");
	private root = createRoot(new Instance("Folder"));

	public onStart() {
		store.subscribe(
			selectCurrencies(LOCAL_PLAYER.UserId),
			(state, previousState) => {
				if (state?.Silver.amount !== previousState?.Silver.amount)
					SoundService.PlayLocalSound(SoundService.SilverChange);
			},
		);

		this.root.render(
			<StrictMode>
				<ReflexProvider producer={store}>
					{createPortal(<App />, this.playerGui)}
				</ReflexProvider>
			</StrictMode>,
		);
	}
}
