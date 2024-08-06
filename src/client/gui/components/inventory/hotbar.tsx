import React, { PropsWithChildren } from "@rbxts/react";

export function Hotbar(props: PropsWithChildren) {
	return (
		<frame
			key="Hotbar"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 1, -10)}
			Size={new UDim2(0, 60, 0, 60)}
		>
			<uigridlayout
				CellPadding={new UDim2(0, 10, 0, 10)}
				CellSize={new UDim2(0, 60, 0, 60)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			{props.children}
		</frame>
	);
}
