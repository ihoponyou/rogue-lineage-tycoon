import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/gui/producer";
import { getDigit } from "shared/get-digit";

const DIGIT_FONT = new Font("rbxasset://fonts/families/HighwayGothic.json");

interface DigitProps {
	name?: string;
	value: number;
	position: UDim2;
	size: UDim2;
}

export function Digit(props: DigitProps) {
	return (
		<frame
			key={props.name}
			BackgroundTransparency={1}
			ClipsDescendants={true}
			Position={props.position}
			Size={props.size}
			ZIndex={4}
		>
			<textlabel
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.Highway}
				FontFace={DIGIT_FONT}
				Position={new UDim2(0, 0, 0.5, 0)}
				Size={new UDim2(1, 0, 1, 0)}
				Text={tostring(props.value)}
				TextColor3={Color3.fromRGB(59, 43, 27)}
				TextSize={14}
				ZIndex={4}
			/>
		</frame>
	);
}

export function Counters() {
	const days = useSelector((state: RootState) => state.stats.days);
	const lives = useSelector((state: RootState) => state.stats.lives);

	return (
		<imagelabel
			key="Counters"
			AnchorPoint={new Vector2(1, 0)}
			BackgroundTransparency={1}
			Image="rbxassetid://2573615198"
			ImageColor3={Color3.fromRGB(254, 186, 120)}
			Position={new UDim2(1, -15, 1, 4)}
			Size={new UDim2(0, 77, 0, 20)}
			ZIndex={4}
		>
			<frame
				key="Back"
				BackgroundColor3={Color3.fromRGB(255, 243, 226)}
				BorderSizePixel={0}
				Position={new UDim2(0, 10, 0, 0)}
				Size={new UDim2(0, 57, 1, -3)}
				ZIndex={3}
			/>
			<Digit
				key="Lives"
				value={lives}
				position={new UDim2(0, 10, 0, 0)}
				size={new UDim2(0, 12, 0, 16)}
			/>
			<Digit
				key="DayHundreds"
				value={getDigit(days, 3)}
				position={new UDim2(0, 29, 0, 0)}
				size={new UDim2(0, 12, 0, 16)}
			/>
			<Digit
				key="DayTens"
				value={getDigit(days, 2)}
				position={new UDim2(0, 42, 0, 0)}
				size={new UDim2(0, 12, 0, 16)}
			/>
			<Digit
				key="DayOnes"
				value={getDigit(days, 1)}
				position={new UDim2(0, 55, 0, 0)}
				size={new UDim2(0, 12, 0, 16)}
			/>
		</imagelabel>
	);
}
