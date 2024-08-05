import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectManaEnabled } from "shared/store/slices/mana/selectors";
import { DialogueBox } from "./dialogue-box";
import { ManaBar } from "./fill-bar/mana-bar";
import { Backpack } from "./inventory/Backpack";
import { Layer } from "./layer";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaEnabled());

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
			<DialogueBox />
			<Backpack />
		</Layer>
	);
}
