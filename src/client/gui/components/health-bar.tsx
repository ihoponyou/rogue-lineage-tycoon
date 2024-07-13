import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectHealth } from "shared/store/slices/players/slices/resources/selectors";

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

const DEFAULT_HEALTH_COLOR = Color3.fromRGB(206, 61, 48);

export function HealthBar() {
	const healthAmount = useSelector(selectHealth(LOCAL_PLAYER.UserId)) ?? -1;
	const [healthColor, setHealthColor] = useState(DEFAULT_HEALTH_COLOR);

	const [percent, setPercent] = useMotor(healthAmount / 100);
	useEffect(
		() => setPercent(new Spring(percent.getValue(), { frequency: 2 })),
		[healthAmount],
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
