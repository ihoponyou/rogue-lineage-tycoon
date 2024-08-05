import React from "@rbxts/react";

export function HotbarFrame() {
	return (
		<frame
			key="MainFrame"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 1, -10)}
			Size={new UDim2(0, 60, 0, 60)}
		/>
	);
}
