import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { getDigit } from "shared/get-digit";
import { selectStats } from "shared/store/slices/players/slices/stats/selectors";
import { HealthBar } from "./bar/health-bar";
import { StomachBar } from "./bar/stomach-bar";
import { TemperatureBar } from "./bar/temperature-bar";
import { ToxicityBar } from "./bar/toxicity-bar";
import { Digit } from "./digit";
import { NamePlate } from "./name-plate";

export function Stats() {
	const stats = useSelector(selectStats(LOCAL_PLAYER.UserId));

	return (
		<frame
			key="Stats"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 1, -105)}
			Size={new UDim2(0, 400, 0, 40)}
			ZIndex={4}
		>
			<frame
				key="WidthFrame"
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={Color3.fromRGB(88, 69, 78)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 1, 0)}
				Size={new UDim2(1, 0, 0, 24)}
				ZIndex={4}
			>
				<imagelabel
					key="Overlay"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Image="rbxassetid://2560512359"
					ImageColor3={Color3.fromRGB(245, 197, 130)}
					Position={new UDim2(0.5, 0, 0, -9)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 16, 1, 19)}
					SliceCenter={new Rect(21, 21, 21, 21)}
					ZIndex={5}
				/>
				<imagelabel
					key="Survival"
					BackgroundTransparency={1}
					Image="rbxassetid://2981483999"
					ImageColor3={Color3.fromRGB(245, 197, 130)}
					Position={new UDim2(0, 15, 1, 4)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(0, 231, 0, 19)}
					SliceCenter={new Rect(14, 0, 20, 0)}
					ZIndex={4}
				>
					<frame
						key="Back"
						BackgroundColor3={Color3.fromRGB(88, 69, 78)}
						BorderSizePixel={0}
						Position={new UDim2(0, 9, 0, 0)}
						Size={new UDim2(1, -18, 1, -2)}
						ZIndex={2}
					>
						<StomachBar />
						<ToxicityBar />
					</frame>
				</imagelabel>
				<HealthBar />
				<TemperatureBar />
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
						value={stats?.lives ?? -1}
						position={new UDim2(0, 10, 0, 0)}
					/>
					<Digit
						key="DayHundreds"
						value={getDigit(stats?.days ?? 0, 3)}
						position={new UDim2(0, 29, 0, 0)}
					/>
					<Digit
						key="DayTens"
						value={getDigit(stats?.days ?? 0, 2)}
						position={new UDim2(0, 42, 0, 0)}
					/>
					<Digit
						key="DayOnes"
						value={getDigit(stats?.days ?? 0, 1)}
						position={new UDim2(0, 55, 0, 0)}
					/>
				</imagelabel>
			</frame>
			<NamePlate />
		</frame>
	);
}