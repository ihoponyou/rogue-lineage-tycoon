import React from "@rbxts/react";

export interface DialogueOptionProps {
	name?: string;
	text: string;
}

const FONT_FACE = new Font(
	"rbxasset://fonts/families/SourceSansPro.json",
	Enum.FontWeight.Regular,
	Enum.FontStyle.Normal,
);

export function DialogueOption(props: DialogueOptionProps) {
	return (
		<imagelabel
			key={props.name ?? "Option"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image="rbxassetid://1327087642"
			ImageTransparency={0.6}
			Position={new UDim2(0.254, 0, -0.112, 20)}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(0, 255, 0, 45)}
			SliceCenter={new Rect(20, 20, 190, 190)}
			ZIndex={6}
		>
			<textbutton
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSans}
				FontFace={FONT_FACE}
				Position={new UDim2(0.055, 0, 0.267, 0)}
				Size={new UDim2(0, 231, 0, 21)}
				Text={""}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextSize={14}
				TextTransparency={1}
			/>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSans}
				FontFace={FONT_FACE}
				Position={new UDim2(0.496, 0, 0.5, 0)}
				RichText={true}
				Size={new UDim2(1.086, -40, 1.356, -40)}
				Text={props.text}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={20}
				TextStrokeTransparency={0.8}
				TextWrapped={true}
				ZIndex={8}
			/>
		</imagelabel>
	);
}
