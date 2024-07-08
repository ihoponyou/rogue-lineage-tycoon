import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectToxicity } from "shared/store/selectors/players";

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
	const toxicity = useSelector(selectToxicity(LOCAL_PLAYER.UserId));

	const [percent, setPercent] = useMotor(toxicity ?? -1);
	useEffect(() => setPercent(new Spring(toxicity ?? -1 / 100)), [toxicity]);

	return (
		<frame
			key="ToxicitySlider"
			BackgroundColor3={Color3.fromRGB(89, 186, 78)}
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
