import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";
import { selectManaColor } from "shared/store/selectors/players";
import { Layer } from "./layer";
import { ManaBar } from "./mana-bar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(
		selectManaColor(Players.LocalPlayer.UserId),
	);

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
		</Layer>
	);
}
