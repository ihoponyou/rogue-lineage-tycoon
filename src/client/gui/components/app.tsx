import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectManaEnabled } from "shared/store/slices/players/selectors";
import { Dialogue } from "./dialogue";
import { Layer } from "./layer";
import { ManaBar } from "./mana-bar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectManaEnabled(LOCAL_PLAYER.UserId));

	return (
		<React.Fragment>
			<Layer>
				<SilverLogo />
				{manaEnabled && <ManaBar />}
				<Stats />
			</Layer>
			<Layer>
				<Dialogue />
			</Layer>
		</React.Fragment>
	);
}
