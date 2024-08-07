import React, { useContext, useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";
import { signalContext } from "client/gui/context";
import {
	selectBackpackOpen,
	selectHotbar,
} from "client/store/slices/gui/selectors";
import { selectItems } from "shared/store/slices/inventory/selectors";
import { Backpack } from "./backpack";
import { DraggableItemButton } from "./draggable-item-button";
import { EmptyHotbarSlot } from "./empty-hotbar-slot";
import { ItemButton } from "./item-button";

export function Inventory() {
	const signal = useContext(signalContext);

	const [activeTool, setActiveTool] = useState<Tool | undefined>(undefined);
	useEffect(() => {
		signal.Fire(activeTool);
	}, [activeTool]);

	const backpackOpen = useSelector(selectBackpackOpen());
	const items = useSelector(selectItems());
	const hotbarItems = useSelector(selectHotbar());

	const backpackButtons = new Array<JSX.Element>();
	const hotbarButtons = new Array<JSX.Element>();
	const emptySlots = new Array<JSX.Element>();
	if (backpackOpen) {
		items.forEach((quantity, tool) => {
			const slot = hotbarItems.get(tool);
			if (slot === undefined && !backpackOpen) return;
			const element = (
				<DraggableItemButton
					tool={tool}
					quantity={quantity}
					activeTool={activeTool}
					setActiveTool={setActiveTool}
					slot={slot}
					position={
						slot !== undefined
							? new UDim2(slot / (MAX_HOTBAR_SLOTS - 1), 0, 0, 0)
							: undefined
					}
				/>
			);
			if (slot === undefined) {
				backpackButtons.push(element);
			} else {
				hotbarButtons.push(element);
			}
		});

		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			emptySlots.push(
				<EmptyHotbarSlot
					index={i}
					visible={true}
					position={new UDim2(i / (MAX_HOTBAR_SLOTS - 1), 0, 0, 0)}
				/>,
			);
		}
	} else {
		let i = 1;
		hotbarItems.forEach((slot, tool) => {
			const quantity = items.get(tool) ?? -1;
			const xScale =
				hotbarItems.size() > 1
					? (i++ - 1) / (hotbarItems.size() - 1)
					: 0;
			const element = (
				<ItemButton
					tool={tool}
					quantity={quantity}
					activeTool={activeTool}
					setActiveTool={setActiveTool}
					slot={slot}
					position={new UDim2(xScale, 0, 0, 0)}
					onM1Down={() => {
						const newTool = tool !== activeTool ? tool : undefined;
						setActiveTool(newTool);
					}}
				/>
			);
			hotbarButtons.push(element);
		});
	}

	return (
		<>
			<Backpack>{backpackButtons}</Backpack>
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
		</>
	);
}
