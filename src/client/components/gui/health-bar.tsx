import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/gui/producer";

// updateHealth(health: number, maxHealth: number): void {
// 		if (!this.healthSlider) return;

// 		const percentHealth = math.clamp(health / maxHealth, 0, 1);
// 		this.healthSlider.TweenSize(
// 			UDim2.fromScale(percentHealth, 1),
// 			Enum.EasingDirection.Out,
// 			Enum.EasingStyle.Quad,
// 			0.25,
// 			true,
// 		);
// 	}

// TODO: make an abstract bar component; current amount, max amount, color, percent

export function HealthBar() {
	const healthAmount = useSelector((state: RootState) => state.health.amount);
	const maxHealthAmount = useSelector((state: RootState) => state.health.max);
	const healthColor = useSelector((state: RootState) => state.health.color);

	const [percent, setPercent] = useMotor(healthAmount);
	useEffect(
		() =>
			setPercent(
				new Spring(healthAmount / maxHealthAmount, { frequency: 2 }),
			),
		[healthAmount, maxHealthAmount],
	);

	return (
		<frame
			key="Health"
			BackgroundColor3={healthColor}
			BorderSizePixel={0}
			Size={percent.map((value) => UDim2.fromScale(value, 1))}
			ZIndex={4}
		>
			<frame
				key="Divider"
				BackgroundColor3={Color3.fromRGB(97, 25, 25)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(1)}
				Size={new UDim2(0, 1, 1, 0)}
				ZIndex={4}
			/>
		</frame>
	);
}
