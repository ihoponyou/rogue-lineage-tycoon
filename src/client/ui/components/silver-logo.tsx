import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectCurrency } from "shared/store/slices/currencies/selectors";

function BorderImage() {
	return (
		<imagelabel
			key="Border"
			BackgroundTransparency={1}
			Image="rbxassetid://2739347995"
			ImageColor3={Color3.fromRGB(245, 197, 130)}
			Position={new UDim2(0, -2, 0, -2)}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(1, 4, 1, 5)}
			SliceCenter={new Rect(5, 5, 5, 5)}
			ZIndex={3}
		/>
	);
}

export function SilverLogo() {
	const silver = useSelector(selectCurrency("Silver"));

	return (
		<imagelabel
			key="SilverLogo"
			Active={false}
			AnchorPoint={new Vector2(0, 1)}
			// AutoButtonColor={false}
			BackgroundTransparency={1}
			Image="rbxassetid://2630515520"
			Position={new UDim2(0, 10, 1, -10)}
			Selectable={false}
			Size={new UDim2(0, 20, 0, 21)}
			SizeConstraint={Enum.SizeConstraint.RelativeXX}
			ZIndex={0}
		>
			<textlabel
				key={"Amount"}
				AnchorPoint={new Vector2(1, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSansBold}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Bold,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(1, 5, 0, -1)}
				Size={new UDim2(0, 0, 0, 20)}
				Text={`${silver?.amount}`}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
				TextStrokeColor3={Color3.fromRGB(74, 74, 74)}
				TextStrokeTransparency={0.5}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={0}
			/>
			<frame
				key="DropFrame"
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 1, -30)}
				Size={new UDim2(0, 100, 0, 50)}
				Visible={false}
				ZIndex={0}
			>
				<textbox
					key="Amount"
					BackgroundColor3={Color3.fromRGB(226, 226, 226)}
					BorderSizePixel={0}
					Font={Enum.Font.Bodoni}
					FontFace={
						new Font(
							"rbxasset://fonts/families/AccanthisADFStd.json",
							Enum.FontWeight.Regular,
							Enum.FontStyle.Normal,
						)
					}
					PlaceholderColor3={Color3.fromRGB(22, 22, 22)}
					Size={new UDim2(1, 0, 0, 25)}
					Text={""}
					TextColor3={Color3.fromRGB(27, 25, 23)}
					TextSize={20}
					TextTransparency={0.1}
					TextTruncate={Enum.TextTruncate.AtEnd}
					ZIndex={0}
				>
					<BorderImage />
				</textbox>
				<textbutton
					key="DropButton"
					BackgroundColor3={Color3.fromRGB(244, 212, 172)}
					BorderSizePixel={0}
					Font={Enum.Font.SourceSans}
					FontFace={
						new Font(
							"rbxasset://fonts/families/SourceSansPro.json",
							Enum.FontWeight.Regular,
							Enum.FontStyle.Normal,
						)
					}
					Position={new UDim2(0, 0, 0, 30)}
					Size={new UDim2(1, 0, 0, 20)}
					Text="Drop"
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextSize={14}
					ZIndex={0}
				>
					<BorderImage />
				</textbutton>
			</frame>
		</imagelabel>
	);
}
