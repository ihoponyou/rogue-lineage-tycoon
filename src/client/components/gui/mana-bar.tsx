import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "../../gui/producer";
import React, { useEffect } from "@rbxts/react";
import { Spring, useMotor } from "@rbxts/pretty-react-hooks";

export function ManaBar() {
	const amount = useSelector((state: RootState) => state.mana.amount);
	const color = useSelector((state: RootState) => state.mana.color);
	const [percent, setPercent] = useMotor(amount);

	useEffect(() => {
		setPercent(
			new Spring(amount / 100, {
				frequency: 25,
			}),
		);
	}, [amount]);

	return (
		<frame
			key="LeftContainer"
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0, 0, 0.9, -70)}
			Selectable={true}
			Size={new UDim2(0, 50, 0.3, 50)}
			SizeConstraint={Enum.SizeConstraint.RelativeYY}
			ZIndex={4}
		>
			<frame
				key="ManaBar"
				AnchorPoint={new Vector2(1, 1)}
				BackgroundColor3={Color3.fromRGB(88, 69, 78)}
				BorderSizePixel={0}
				Position={new UDim2(1, 0, 1, 0)}
				Size={new UDim2(0, 28, 1, 0)}
				ZIndex={4}
			>
				<frame
					key="ManaSlider"
					AnchorPoint={new Vector2(0, 1)}
					BackgroundColor3={color}
					BorderSizePixel={0}
					Position={new UDim2(0, 0, 1, 0)}
					Size={percent.map((percent) => new UDim2(1, 0, percent, 0))}
					ZIndex={4}
				>
					<frame
						key="Divider"
						BackgroundColor3={Color3.fromRGB(88, 69, 78)}
						BorderSizePixel={0}
						Position={new UDim2(0, 0, 0, -1)}
						Size={new UDim2(1, 0, 0, 1)}
					/>
				</frame>
				<imagelabel
					key="Overlay"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Image="rbxassetid://2560546833"
					ImageColor3={Color3.fromRGB(245, 197, 130)}
					Position={new UDim2(0.5, 0, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 14, 1, 3)}
					SliceCenter={new Rect(13, 19, 13, 19)}
					ZIndex={4}
				/>
			</frame>
		</frame>
	);
}
