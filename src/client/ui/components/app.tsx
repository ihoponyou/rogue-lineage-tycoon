import React, { useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectEquippables } from "client/store/slices/equippables/selectors";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { MAX_HOTBAR_SLOTS } from "shared/configs/constants";
import { ItemId } from "shared/configs/items";
import { EquippableId } from "shared/modules/equippable";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { selectInventory } from "shared/store/slices/inventory/selectors";
import { selectSkills } from "shared/store/slices/skills/selectors";
import { appRefContext } from "../context";
import { DialogueBox } from "./dialogue-box";
import { ManaBar } from "./fill-bar/mana-bar";
import { Backpack } from "./inventory/backpack";
import { DraggableEquippableButton } from "./inventory/draggable-equippable-button";
import { EquippableButton } from "./inventory/equippable-button";
import { Hotbar } from "./inventory/hotbar";
import { SilverLogo } from "./silver-logo";
import { Stats } from "./stats";

export function App() {
	const manaEnabled = useSelector(selectSkills()).has("Mana");
	const ref = useRef<ScreenGui>();
	const isBackpackOpen = useSelector(selectIsBackpackOpen());
	const hotbar = useSelector(selectHotbar());
	const inventory = useSelector(selectInventory());
	const equippables = useSelector(selectEquippables());

	const hotbarButtons = new Array<React.Element>();
	const backpackButtons = new Array<React.Element>();
	for (const [id, equippable] of equippables) {
		const quantity = inventory.get(id as ItemId);
		const slot = hotbar.indexOf(id as EquippableId);
		if (slot !== -1) {
			if (isBackpackOpen) {
				hotbarButtons.push(
					<DraggableEquippableButton
						slot={slot}
						equippable={equippable}
						equippableName={id}
						position={UDim2.fromScale(
							slot / (MAX_HOTBAR_SLOTS - 1),
							0,
						)}
						quantity={quantity}
					/>,
				);
				continue;
			}
			hotbarButtons.push(
				<EquippableButton
					slot={slot}
					equippable={equippable}
					equippableName={id}
					quantity={quantity}
				/>,
			);
			continue;
		}

		backpackButtons.push(
			<DraggableEquippableButton
				equippable={equippable}
				equippableName={id}
				quantity={quantity}
			/>,
		);
	}

	return (
		<screengui
			key={"App"}
			ref={ref}
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
		>
			<SilverLogo />
			<Stats />
			<DialogueBox />
			{manaEnabled && <ManaBar />}
			<appRefContext.Provider value={ref}>
				<Hotbar>{hotbarButtons}</Hotbar>
				{isBackpackOpen && <Backpack>{backpackButtons}</Backpack>}
			</appRefContext.Provider>
		</screengui>
	);
}
