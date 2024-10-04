import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";
import {
	selectBackpackOpen,
	selectHotbar,
} from "client/store/slices/gui/selectors";
import { selectItems } from "shared/store/slices/inventory/selectors";
import { EmptyHotbarSlot } from "./empty-hotbar-slot";

export function Backpack() {
	const backpackOpen = useSelector(selectBackpackOpen());
	const items = useSelector(selectItems());
	const hotbarItems = useSelector(selectHotbar());

	const backpackButtons = new Array<JSX.Element>();
	const emptySlots = new Array<JSX.Element>();
	items.forEach((quantity, tool) => {
		// if tool is in hotbar, do not render in backpack
		for (const [_, value] of hotbarItems) {
			if (tool === value.Name) return;
		}
		// backpackButtons.push(
		// 	<DraggableItemButton equippable={} quantity={quantity} />,
		// );
	});

	for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
		emptySlots.push(
			<EmptyHotbarSlot
				index={i}
				visible={true}
				position={UDim2.fromScale(i / (MAX_HOTBAR_SLOTS - 1))}
			/>,
		);
	}

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
			Visible={backpackOpen}
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
				<uigridlayout
					CellPadding={new UDim2(0, 10, 0, 10)}
					CellSize={new UDim2(0, 60, 0, 60)}
				/>
				<uipadding
					PaddingBottom={new UDim(0, 8)}
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
					PaddingTop={new UDim(0, 8)}
				/>
				{backpackButtons}
			</scrollingframe>
		</frame>
	);
}
