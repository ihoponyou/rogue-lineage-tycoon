import React from "@rbxts/react";

interface Props {
	index: number;
	visible: boolean;
}

export function EmptyHotbarSlot(props: Props) {
	return (
		<imagelabel
			key="EmptySlot"
			LayoutOrder={props.index}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			Image="rbxassetid://2739347995"
			ImageColor3={Color3.fromRGB(245, 202, 145)}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(0, 60, 0, 61)}
			SliceCenter={new Rect(5, 5, 5, 5)}
			ZIndex={0}
			Visible={props.visible}
		/>
	);
}
