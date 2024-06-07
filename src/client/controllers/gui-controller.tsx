import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { App } from "client/components/app";

@Controller({})
export class GuiController implements OnStart {
	playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	root = createRoot(new Instance("Folder"));

	onStart() {
		this.root.render(
			createPortal(
				<StrictMode>
					<App />
				</StrictMode>,
				this.playerGui,
			),
		);
	}
}
