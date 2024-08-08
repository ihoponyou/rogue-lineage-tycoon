import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";
import { store } from "client/store";
import {
	selectActiveTool,
	selectBackpackOpen,
	selectHotbar,
} from "client/store/slices/gui/selectors";
import { selectItems } from "shared/store/slices/inventory/selectors";
import { DraggableItemButton } from "./draggable-item-button";
import { EmptyHotbarSlot } from "./empty-hotbar-slot";
import { ItemButton } from "./item-button";

export function Hotbar() {
	const backpackOpen = useSelector(selectBackpackOpen());
	const items = useSelector(selectItems());
	const hotbarItems = useSelector(selectHotbar());
	const activeTool = useSelector(selectActiveTool());

	const hotbarButtons = new Array<JSX.Element>();

	let i = 1;
	hotbarItems.forEach((tool, slot) => {
		const quantity = items.get(tool) ?? -1;
		const xScale =
			hotbarItems.size() > 1 ? (i++ - 1) / (hotbarItems.size() - 1) : 0;
		const element = backpackOpen ? (
			<DraggableItemButton
				tool={tool}
				quantity={quantity}
				slot={slot}
				position={UDim2.fromScale(slot / (MAX_HOTBAR_SLOTS - 1))}
			/>
		) : (
			<ItemButton
				tool={tool}
				quantity={quantity}
				slot={slot}
				position={UDim2.fromScale(xScale)}
				onM1Down={() => {
					const newTool = tool === activeTool ? undefined : tool;
					store.setActiveTool(newTool);
				}}
			/>
		);
		hotbarButtons.push(element);
	});

	const emptySlots = new Array<JSX.Element>();
	if (backpackOpen) {
		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			emptySlots.push(
				<EmptyHotbarSlot
					index={i}
					visible={true}
					position={new UDim2(i / (MAX_HOTBAR_SLOTS - 1), 0, 0, 0)}
				/>,
			);
		}
	}

	return (
		<frame
			key="Hotbar"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 1, -10)}
			Size={UDim2.fromOffset(
				backpackOpen ? 792 : 72 * (hotbarItems.size() - 1),
				60,
			)}
		>
			{!backpackOpen && (
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			)}
			{hotbarButtons}
			{emptySlots}
		</frame>
	);
}
