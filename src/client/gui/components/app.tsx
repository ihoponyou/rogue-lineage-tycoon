import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectManaEnabled } from "shared/store/slices/players/selectors";
import { DialogueBox } from "./dialogue-box";
import { ManaBar } from "./fill-bar/mana-bar";
import { Layer } from "./layer";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaEnabled(LOCAL_PLAYER.UserId));

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
			<DialogueBox />
		</Layer>
	);
}
