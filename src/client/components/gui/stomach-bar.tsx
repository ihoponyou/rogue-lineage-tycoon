import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/gui/producer";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";

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
