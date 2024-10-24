import React from "@rbxts/react";

interface EmptySlotProps {
	slot?: number;
	position: UDim2;
	visible: boolean;
}

export function EmptySlot(props: EmptySlotProps) {
	return (
		<imagelabel
			key="EmptySlot"
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			Image="rbxassetid://2739347995"
			ImageColor3={Color3.fromRGB(245, 202, 145)}
			LayoutOrder={props.slot}
			Position={props.position}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(0, 60, 0, 61)}
			SliceCenter={new Rect(5, 5, 5, 5)}
			Visible={props.visible}
			ZIndex={-1}
		/>
	);
}
