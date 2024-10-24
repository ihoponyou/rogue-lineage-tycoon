import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectTemperature } from "shared/store/slices/resources/selectors";

export function TemperatureBar() {
	const currentTemperature = useSelector(selectTemperature()) ?? 0;

	const [percent, percentMotion] = useMotion(currentTemperature / 100);
	useEffect(
		() => percentMotion.tween(currentTemperature / 100),
		[currentTemperature],
	);

	return (
		<imagelabel
			key="Temperature"
			AnchorPoint={new Vector2(1, 0)}
			BackgroundTransparency={1}
			Image="rbxassetid://2985309582"
			ImageColor3={Color3.fromRGB(245, 197, 130)}
			Position={new UDim2(1, -96, 1, 4)}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(0, 54, 0, 10)}
			SliceCenter={new Rect(14, 0, 40, 0)}
			ZIndex={4}
		>
			<imagelabel
				key="Gradient"
				BackgroundTransparency={1}
				Image="rbxassetid://2985387760"
				Position={new UDim2(0, 12, 0, 0)}
				Size={new UDim2(0, 30, 0, 6)}
				ZIndex={3}
			>
				<frame
					key="TemperatureSlider"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundColor3={Color3.fromRGB(229, 183, 121)}
					BorderColor3={Color3.fromRGB(72, 57, 37)}
					Position={percent.map((value) => UDim2.fromScale(value))}
					Size={new UDim2(0, 2, 1, 0)}
					ZIndex={3}
				/>
			</imagelabel>
		</imagelabel>
	);
}
