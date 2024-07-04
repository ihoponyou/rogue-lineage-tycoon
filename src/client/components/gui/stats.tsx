import React from "@rbxts/react";

<frame
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
		<frame
			key="HealthSlider"
			BackgroundColor3={Color3.fromRGB(206, 61, 48)}
			BorderSizePixel={0}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={4}
		>
			<frame
				key="Divider"
				BackgroundColor3={Color3.fromRGB(97, 25, 25)}
				BorderSizePixel={0}
				Position={new UDim2(1, 0, 0, 0)}
				Size={new UDim2(0, 1, 1, 0)}
				ZIndex={4}
			/>
		</frame>
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
			ZIndex={4}
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
				<frame
					key="StomachSlider"
					BackgroundColor3={Color3.fromRGB(240, 208, 26)}
					BorderSizePixel={0}
					Size={new UDim2(0, 213, 0, 6)}
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
				<frame
					key="ToxicitySlider"
					BackgroundColor3={Color3.fromRGB(89, 186, 78)}
					BorderSizePixel={0}
					Position={new UDim2(0, 0, 0, 9)}
					Size={new UDim2(0, 0, 0, 6)}
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
			</frame>
		</imagelabel>
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
					Position={new UDim2(0.5, 0, 0, 0)}
					Size={new UDim2(0, 2, 1, 0)}
					ZIndex={3}
				/>
			</imagelabel>
		</imagelabel>
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
			<frame
				key="DayTens"
				BackgroundTransparency={1}
				ClipsDescendants={true}
				Position={new UDim2(0, 42, 0, 0)}
				Size={new UDim2(0, 12, 0, 16)}
				ZIndex={4}
			>
				<textlabel
					key="Digit"
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Highway}
					FontFace={Font { Family = rbxasset://fonts/families/HighwayGothic.json, Weight = Regular, Style = Normal }}
					Position={new UDim2(0, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="0"
					TextColor3={Color3.fromRGB(59, 43, 27)}
					TextSize={14}
					ZIndex={4}
				/>
			</frame>
			<frame
				key="Lives"
				BackgroundTransparency={1}
				ClipsDescendants={true}
				Position={new UDim2(0, 10, 0, 0)}
				Size={new UDim2(0, 12, 0, 16)}
				ZIndex={4}
			>
				<textlabel
					key="Digit"
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Highway}
					FontFace={Font { Family = rbxasset://fonts/families/HighwayGothic.json, Weight = Regular, Style = Normal }}
					Position={new UDim2(0, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="0"
					TextColor3={Color3.fromRGB(59, 43, 27)}
					TextSize={14}
					ZIndex={4}
				/>
			</frame>
			<frame
				key="DayOnes"
				BackgroundTransparency={1}
				ClipsDescendants={true}
				Position={new UDim2(0, 55, 0, 0)}
				Size={new UDim2(0, 12, 0, 16)}
				ZIndex={4}
			>
				<textlabel
					key="Digit"
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Highway}
					FontFace={Font { Family = rbxasset://fonts/families/HighwayGothic.json, Weight = Regular, Style = Normal }}
					Position={new UDim2(0, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="0"
					TextColor3={Color3.fromRGB(59, 43, 27)}
					TextSize={14}
					ZIndex={4}
				/>
			</frame>
			<frame
				key="DayHundreds"
				BackgroundTransparency={1}
				ClipsDescendants={true}
				Position={new UDim2(0, 29, 0, 0)}
				Size={new UDim2(0, 12, 0, 16)}
				ZIndex={4}
			>
				<textlabel
					key="Digit"
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Highway}
					FontFace={Font { Family = rbxasset://fonts/families/HighwayGothic.json, Weight = Regular, Style = Normal }}
					Position={new UDim2(0, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="0"
					TextColor3={Color3.fromRGB(59, 43, 27)}
					TextSize={14}
					ZIndex={4}
				/>
			</frame>
		</imagelabel>
	</frame>
	<textlabel
		key="CharacterName"
		AnchorPoint={new Vector2(0, 1)}
		BackgroundTransparency={1}
		Font={Enum.Font.Antique}
		FontFace={Font { Family = rbxasset://fonts/families/RomanAntique.json, Weight = Regular, Style = Normal }}
		Position={new UDim2(0, 3, 1, -26)}
		Size={new UDim2(1, -32, 0, 20)}
		Text="TEXT"
		TextColor3={Color3.fromRGB(255, 255, 255)}
		TextSize={20}
		TextStrokeColor3={Color3.fromRGB(112, 95, 67)}
		TextStrokeTransparency={0}
		TextXAlignment={Enum.TextXAlignment.Left}
		ZIndex={90}
	>
		<textlabel
			key="Shadow"
			BackgroundTransparency={1}
			Font={Enum.Font.Antique}
			FontFace={Font { Family = rbxasset://fonts/families/RomanAntique.json, Weight = Regular, Style = Normal }}
			Position={new UDim2(0, 2, 0, 1)}
			Size={new UDim2(1, 0, 1, 0)}
			Text="TEXT"
			TextColor3={Color3.fromRGB(0, 0, 0)}
			TextSize={20}
			TextTransparency={0.75}
			TextXAlignment={Enum.TextXAlignment.Left}
			ZIndex={90}
		/>
	</textlabel>
</frame>
