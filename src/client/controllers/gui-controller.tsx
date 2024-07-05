import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players, SoundService } from "@rbxts/services";
import { App } from "client/components/gui/app";
import { producer } from "client/gui/producer";
import { Events, Functions } from "client/networking";

const MAX_FETCH_RETRIES = 10;

@Controller()
export class GuiController implements OnStart {
	private playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	private root = createRoot(new Instance("Folder"));

	public onStart() {
		Promise.retry(
			() =>
				Functions.currency
					.getSilver()
					.andThen((value) => producer.setSilver(value)),
			MAX_FETCH_RETRIES,
		).finally(() => {
			Events.currency.changed.connect((currency, value) => {
				if (currency === "Silver") {
					producer.setSilver(value);
				}
			});

			producer.subscribe(
				(state) => state.currencies.silver,
				(amount, previousAmount) => {
					if (amount !== previousAmount)
						SoundService.PlayLocalSound(SoundService.SilverChange);
				},
			);
		});

		Events.mana.obtained.connect(() => producer.setManaEnabled(true));
		Events.mana.disabled.connect(() => producer.setManaEnabled(false));
		Events.mana.changed.connect((value) => producer.setManaAmount(value));
		Events.mana.colorChanged.connect((color) =>
			producer.setManaColor(color),
		);

		this.root.render(
			<StrictMode>
				<ReflexProvider producer={producer}>
					{createPortal(<App />, this.playerGui)}
				</ReflexProvider>
			</StrictMode>,
		);
	}
}
