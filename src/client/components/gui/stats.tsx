import React from "@rbxts/react";
import { DayCounter } from "./day-counter";
import { HealthBar } from "./health-bar";
import { LifeCounter } from "./life-counter";
import { NamePlate } from "./name-plate";
import { StomachBar } from "./stomach-bar";
import { TemperatureBar } from "./temperature-bar";
import { ToxicityBar } from "./toxicity-bar";

export function Stats() {
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
					<LifeCounter position={new UDim2(0, 10, 0, 0)} />
					<DayCounter />
				</imagelabel>
			</frame>
			<NamePlate />
		</frame>
	);
}
