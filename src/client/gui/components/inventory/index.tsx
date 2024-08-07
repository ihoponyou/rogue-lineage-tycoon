import React, { useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { MAX_HOTBAR_SLOTS } from "client/constants";
import {
	selectBackpackOpen,
	selectHotbar,
} from "client/store/slices/gui/selectors";
import { selectItems } from "shared/store/slices/inventory/selectors";
import { Backpack } from "./backpack";
import { DraggableItemButton } from "./draggable-item-button";
import { EmptyHotbarSlot } from "./empty-hotbar-slot";
import { Hotbar } from "./hotbar";

export function Inventory() {
	const [activeTool, setActiveTool] = useState<Tool | undefined>(undefined);

	const backpackOpen = useSelector(selectBackpackOpen());
	const backpackItems = useSelector(selectItems());
	const hotbarItems = useSelector(selectHotbar());

	const backpackButtons = new Array<JSX.Element>();
	const hotbarButtons = new Array<JSX.Element>();
	backpackItems.forEach((_quantity, tool) => {
		const slot = hotbarItems.get(tool);
		const element = (
			<DraggableItemButton
				tool={tool}
				activeTool={activeTool}
				setActiveTool={setActiveTool}
				slot={slot}
			/>
		);
		if (slot === undefined) {
			backpackButtons.push(element);
		} else {
			hotbarButtons.push(element);
		}
	});

	const emptySlots = new Array<JSX.Element>();
	if (backpackOpen) {
		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			emptySlots.push(
				<EmptyHotbarSlot
					index={i}
					visible={hotbarButtons[i] === undefined}
				/>,
			);
		}
	}

	return (
		<>
			<Backpack>{backpackButtons}</Backpack>
			<Hotbar>
				{hotbarButtons}
				{backpackOpen && emptySlots}
			</Hotbar>
		</>
	);
}
