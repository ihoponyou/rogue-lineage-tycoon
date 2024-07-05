import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/gui/producer";

// const WHITE_STOMACH_RACES = [
// 	"Gaian",
// 	"Cameo",
// 	"Dullahan",
// 	"Metascroom",
// 	"Lich",
// 	"Seraph",
// 	"Florian",
// ];

// updateStomach(stomach: number): void {
// 		if (!this.stomachSlider) return;

// 		const percentStomach = math.clamp(stomach / MAX_STOMACH, 0, 1);
// 		this.stomachSlider.TweenSize(
// 			new UDim2(percentStomach, 0, 0, 6),
// 			Enum.EasingDirection.Out,
// 			Enum.EasingStyle.Quad,
// 			0.25,
// 			true,
// 		);
// 	}

export function StomachBar() {
	const stomachAmount = useSelector(
		(state: RootState) => state.stomach.amount,
	);
	const maxStomachAmount = useSelector(
		(state: RootState) => state.stomach.max,
	);
	const stomachColor = useSelector((state: RootState) => state.stomach.color);

	const [percent, setPercent] = useMotor(stomachAmount);
	useEffect(
		() => setPercent(new Spring(stomachAmount / maxStomachAmount)),
		[stomachAmount, maxStomachAmount],
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
