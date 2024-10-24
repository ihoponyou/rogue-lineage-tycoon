import React, { PropsWithChildren } from "@rbxts/react";

export function Backpack(props: PropsWithChildren) {
	return (
		<frame
			key="Backpack"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			BackgroundTransparency={0.8}
			BorderSizePixel={0}
			Position={new UDim2(0.5, 0, 1, -80)}
			Size={new UDim2(0.5, 0, 0.5, 0)}
			ZIndex={0}
		>
			<imagelabel
				key="Overlay"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image="rbxassetid://2739347995"
				ImageColor3={Color3.fromRGB(245, 197, 130)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Slice}
				Size={new UDim2(1, 4, 1, 4)}
				SliceCenter={new Rect(5, 5, 5, 5)}
				ZIndex={0}
			/>
			<scrollingframe
				BackgroundTransparency={1}
				BorderSizePixel={0}
				BottomImage="rbxassetid://3515608177"
				HorizontalScrollBarInset={Enum.ScrollBarInset.Always}
				MidImage="rbxassetid://3515608813"
				Position={new UDim2(0, 5, 0, 5)}
				ScrollBarImageColor3={Color3.fromRGB(245, 197, 130)}
				ScrollBarThickness={10}
				ScrollingDirection={Enum.ScrollingDirection.Y}
				Size={new UDim2(1, -10, 1, -10)}
				TopImage="rbxassetid://3515609176"
			>
				<uigridlayout CellPadding={new UDim2(0, 10, 0, 10)} CellSize={new UDim2(0, 60, 0, 60)} />
				<uipadding
					PaddingBottom={new UDim(0, 8)}
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
					PaddingTop={new UDim(0, 8)}
				/>
				{props.children}
			</scrollingframe>
		</frame>
	);
}
