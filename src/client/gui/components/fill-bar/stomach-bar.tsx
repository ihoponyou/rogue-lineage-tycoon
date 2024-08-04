import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectRace } from "shared/store/slices/identity/selectors";
import { selectStomach } from "shared/store/slices/resources/selectors";
import { FillBar } from ".";

const WHITE_STOMACH_RACES = [
	"Gaian",
	"Cameo",
	"Dullahan",
	"Metascroom",
	"Lich",
	"Seraph",
	"Florian",
];

const DEFAULT_STOMACH_COLOR = Color3.fromRGB(240, 208, 26);
const WHITE_STOMACH_COLOR = Color3.fromRGB(229, 229, 204);

export function StomachBar() {
	const stomachAmount = useSelector(selectStomach()) ?? 0;

	// TODO: white stomach stays when wiping from white-stomached race to a non white-stomached race
	const [stomachColor, setStomachColor] = useState(DEFAULT_STOMACH_COLOR);
	const raceName = useSelector(selectRace());
	useEffect(() => {
		if (!WHITE_STOMACH_RACES.includes(raceName ?? "")) return;
		setStomachColor(WHITE_STOMACH_COLOR);
	}, [raceName]);

	return (
		<FillBar
			name="Stomach"
			amount={stomachAmount}
			maxAmount={100}
			barSizeFn={(percent) => new UDim2(percent, 0, 0, 6)}
			barColor={stomachColor}
			barAnchorPoint={Vector2.zero}
			barPosition={new UDim2()}
			dividerColor={Color3.fromRGB(97, 25, 25)}
			dividerPosition={UDim2.fromScale(1)}
			dividerSize={new UDim2(0, 1, 1, 0)}
			zIndex={3}
		/>
	);
}
