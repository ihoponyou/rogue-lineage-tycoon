import React, { useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectManaEnabled } from "shared/store/slices/mana/selectors";
import { appContext } from "../context";
import { DialogueBox } from "./dialogue-box";
import { ManaBar } from "./fill-bar/mana-bar";
import { Backpack } from "./inventory/backpack";
import { Hotbar } from "./inventory/hotbar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaEnabled());
	print(manaEnabled);
	const ref = useRef<ScreenGui>();

	return (
		<screengui
			key={"App"}
			ref={ref}
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
		>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
			<DialogueBox />
			<appContext.Provider value={ref}>
				<Backpack />
				<Hotbar />
			</appContext.Provider>
		</screengui>
	);
}
