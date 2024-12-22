import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

interface FillBarProps {
	name: string;
	amount: number;
	maxAmount: number;
	barSizeFn: (percent: number) => UDim2;
	barColor: Color3;
	barAnchorPoint: Vector2;
	barPosition: UDim2;
	dividerPosition: UDim2;
	dividerColor: Color3;
	dividerSize: UDim2;
	springFrequency?: number;
	zIndex?: number;
}

// TODO: find original tween properties for mana bar, health bar, stomach, tox

// MANA BAR
// const MANA_TWEEN_INFO = new TweenInfo(
// 	0.1,
// 	Enum.EasingStyle.Sine,
// 	Enum.EasingDirection.Out,
// );

export function FillBar(props: FillBarProps) {
	const [percent, percentMotion] = useMotion(props.amount / props.maxAmount);

	useEffect(
		() =>
			percentMotion.tween(props.amount / props.maxAmount, {
				time: 0.1,
				style: Enum.EasingStyle.Sine,
				direction: Enum.EasingDirection.Out,
			}),
		[props.amount],
	);

	return (
		<frame
			key={props.name}
			BackgroundColor3={props.barColor}
			BorderSizePixel={0}
			Size={percent.map(props.barSizeFn)}
			ZIndex={props.zIndex ?? 0}
			AnchorPoint={props.barAnchorPoint}
			Position={props.barPosition}
		>
			<frame
				key="Divider"
				BackgroundColor3={props.dividerColor}
				BorderSizePixel={0}
				Position={props.dividerPosition}
				Size={props.dividerSize}
				ZIndex={props.zIndex ?? 0}
			/>
		</frame>
	);
}
