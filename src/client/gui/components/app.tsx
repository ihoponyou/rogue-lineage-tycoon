import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectBackpackOpen } from "client/store/slices/gui/selectors";
import { selectManaEnabled } from "shared/store/slices/mana/selectors";
import { DialogueBox } from "./dialogue-box";
import { ManaBar } from "./fill-bar/mana-bar";
import { BackpackFrame } from "./inventory/BackpackFrame";
import { Layer } from "./layer";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaEnabled());
	const backpackOpen = useSelector(selectBackpackOpen());

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			{!backpackOpen && <Stats />}
			<DialogueBox />
			{backpackOpen && <BackpackFrame />}
		</Layer>
	);
}
