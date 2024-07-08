import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectRace, selectStomach } from "shared/store/selectors/players";

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
	const stomachAmount = useSelector(selectStomach(LOCAL_PLAYER.UserId));

	const [stomachColor, setStomachColor] = useState(DEFAULT_STOMACH_COLOR);
	const raceName = useSelector(selectRace(LOCAL_PLAYER.UserId));
	useEffect(() => {
		if (!WHITE_STOMACH_RACES.includes(raceName ?? "")) return;
		setStomachColor(WHITE_STOMACH_COLOR);
	}, [raceName]);

	const [percent, setPercent] = useMotor((stomachAmount ?? -100) / 100);
	useEffect(
		() => setPercent(new Spring((stomachAmount ?? -1) / 100)),
		[stomachAmount],
	);

	return (
		<frame
			key="Stomach"
			BackgroundColor3={stomachColor}
			BorderSizePixel={0}
			Size={percent.map((value) => new UDim2(value, 0, 0, 6))}
			ZIndex={3}
		>
			<frame
				key="Divider"
				BackgroundColor3={Color3.fromRGB(97, 25, 25)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(1)}
				Size={new UDim2(0, 1, 1, 0)}
				ZIndex={3}
			/>
		</frame>
	);
}
