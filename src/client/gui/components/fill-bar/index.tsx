import { Spring, useMotor } from "@rbxts/pretty-react-hooks";
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

export function FillBar(props: FillBarProps) {
	const [percent, setPercent] = useMotor(props.amount / props.maxAmount);
	useEffect(
		() =>
			setPercent(
				new Spring(
					props.amount / props.maxAmount,
					props.springFrequency !== undefined
						? { frequency: props.springFrequency }
						: undefined,
				),
			),
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
