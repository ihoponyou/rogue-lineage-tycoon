import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectManaColor } from "shared/store/selectors/players";
import { Layer } from "./layer";
import { ManaBar } from "./mana-bar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaColor(LOCAL_PLAYER.UserId));

	return (
		<Layer>
			<SilverLogo />
			{manaEnabled && <ManaBar />}
			<Stats />
		</Layer>
	);
}
