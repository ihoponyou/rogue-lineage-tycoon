import React from "@rbxts/react";
import { Layer } from "./layer";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "../../gui/producer";
import { ManaBar } from "./mana-bar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector((state: RootState) => state.mana.enabled);

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
		</Layer>
	);
}
