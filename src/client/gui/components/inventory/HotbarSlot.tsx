import React from "@rbxts/react";

export function HotbarSlot() {
	return (
		<textbutton
			key="ToolFrame"
			Active={false}
			AnchorPoint={new Vector2(0.5, 0)}
			AutoButtonColor={false}
			BackgroundColor3={Color3.fromRGB(255, 248, 238)}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font(
					"rbxasset://fonts/families/Balthazar.json",
					Enum.FontWeight.Regular,
					Enum.FontStyle.Normal,
				)
			}
			Selectable={false}
			Size={new UDim2(0, 60, 0, 60)}
			Text="???"
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextWrapped={true}
			Visible={false}
		>
			<imagelabel
				key="Overlay"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image="rbxassetid://3419850962"
				ImageColor3={Color3.fromRGB(245, 197, 130)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Slice}
				Size={new UDim2(1, 10, 1, 10)}
				SliceCenter={new Rect(13, 13, 13, 13)}
			/>
			<textlabel
				key="Quantity"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSans}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Regular,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 1, 0)}
				Size={new UDim2(0, 20, 0, 12)}
				Text="x?"
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				Visible={false}
				ZIndex={2}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
			<textlabel
				key="Slot"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSansBold}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Bold,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(0, 16, 0, 12)}
				Text="?"
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				ZIndex={2}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
		</textbutton>
	);
}
