import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/gui/producer";

// updateToxicity(toxicity: number): void {
// 		if (!this.toxicitySlider) return;

// 		const percentToxicity = math.clamp(toxicity / MAX_TOXICITY, 0, 1);
// 		this.toxicitySlider.TweenSize(
// 			new UDim2(percentToxicity, 0, 0, 6),
// 			Enum.EasingDirection.Out,
// 			Enum.EasingStyle.Quad,
// 			0.25,
// 			true,
// 		);
// 	}

export function ToxicityBar() {
	const amount = useSelector((state: RootState) => state.toxicity.amount);
	const max = useSelector((state: RootState) => state.toxicity.max);
	const color = useSelector((state: RootState) => state.toxicity.color);

	const [percent, setPercent] = useMotor(amount);
	useEffect(() => setPercent(new Spring(amount / max)), [amount, max]);

	return (
		<frame
			key="ToxicitySlider"
			BackgroundColor3={color}
			BorderSizePixel={0}
			Position={new UDim2(0, 0, 0, 9)}
			Size={percent.map((value) => new UDim2(value, 0, 0, 6))}
			ZIndex={3}
		>
			<frame
				key="Divider"
				BackgroundColor3={Color3.fromRGB(97, 25, 25)}
				BorderSizePixel={0}
				Position={new UDim2(1, 0, 0, 0)}
				Size={new UDim2(0, 1, 1, 0)}
				ZIndex={3}
			/>
		</frame>
	);
}
