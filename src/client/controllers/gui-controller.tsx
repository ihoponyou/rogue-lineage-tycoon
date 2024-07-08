import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players, SoundService } from "@rbxts/services";
import { App } from "client/components/gui/app";
import { store } from "client/store";
import { selectCurrencies } from "shared/store/selectors/players";

const MAX_FETCH_RETRIES = 10;

@Controller()
export class GuiController implements OnStart {
	private playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	private root = createRoot(new Instance("Folder"));

	public onStart() {
		store.subscribe(
			selectCurrencies(Players.LocalPlayer.UserId),
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
