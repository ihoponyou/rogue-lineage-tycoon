import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";
import {
	selectBackpackOpen,
	selectHotbar,
} from "client/store/slices/gui/selectors";
import { DraggableItemButton } from "./draggable-item-button";
import { EmptyHotbarSlot } from "./empty-hotbar-slot";

interface Props {
	activeTool?: Tool;
	setActiveTool: React.Dispatch<React.SetStateAction<Tool | undefined>>;
}

export function Hotbar(props: Props) {
	const hotbarItems = useSelector(selectHotbar());
	const backpackOpen = useSelector(selectBackpackOpen());

	const itemButtons = new Array<JSX.Element>();
	hotbarItems.forEach((slot, tool) => {
		itemButtons[slot] = (
			<DraggableItemButton
				tool={tool}
				activeTool={props.activeTool}
				setActiveTool={props.setActiveTool}
				layoutOrder={slot}
			/>
		);
	});

	const emptySlots = new Array<JSX.Element>();
	if (backpackOpen) {
		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			emptySlots[i] = (
				<EmptyHotbarSlot
					index={i}
					visible={itemButtons[i] === undefined}
				/>
			);
		}
	}

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
			{itemButtons}
			{emptySlots}
		</frame>
	);
}
