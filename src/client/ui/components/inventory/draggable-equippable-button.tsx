import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useBinding, useContext, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { GuiService, RunService, UserInputService } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/configs/constants";
import { Events } from "client/network";
import { appRefContext } from "client/ui/context/app-ref";
import { EquippableId } from "shared/modules/equippable";
import { ItemId } from "shared/modules/item-id";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { singletonContext } from "../context/singleton";
import { EquippableButton, EquippableButtonProps } from "./equippable-button";

export function DraggableEquippableButton(props: EquippableButtonProps) {
	const appRef = useContext(appRefContext);
	const controllers = useContext(singletonContext);

	const hotbar = useSelector(selectHotbar());
	const inHotbar = hotbar.includes(props.equippableName as ItemId);

	const [position, setPosition] = useBinding(new UDim2());
	const [cursorOffset, setCursorOffset] = useState(Vector2.zero);
	const [dragging, setDragging] = useState(false);

	useEventListener(RunService.RenderStepped, (_deltaTime) => {
		if (!dragging) return;
		const inset = GuiService.GetGuiInset()[0];
		const mousePos = UserInputService.GetMouseLocation().sub(inset);
		setPosition(
			UDim2.fromOffset(mousePos.X + cursorOffset.X + inset.X + 30, mousePos.Y + cursorOffset.Y + inset.Y),
		);
	});

	return dragging && appRef?.current
		? createPortal(
				EquippableButton({
					...props,
					position: position,
					onM1Up: (mousePos) => {
						setDragging(false);

						const hoveredObjects = LOCAL_PLAYER_GUI.GetGuiObjectsAtPosition(mousePos.X, mousePos.Y);
						const index = hoveredObjects.findIndex((object) => object.Name === "EmptySlot");
						const emptySlot = hoveredObjects[index];
						let transferredFromBackpack = false;
						if (emptySlot === undefined) {
							transferredFromBackpack = inHotbar;
							Events.removeFromHotbar(props.equippableName as EquippableId);
						} else {
							transferredFromBackpack = !inHotbar || emptySlot.LayoutOrder !== props.slot;
							Events.addToHotbar(props.equippableName as EquippableId, emptySlot.LayoutOrder);
						}

						const character = controllers.character.getCharacter();
						if (!transferredFromBackpack && character !== undefined) {
							if (props.equippable.isEquipped()) {
								props.equippable.unequip(character);
							} else {
								props.equippable.equip(character);
							}
						}
					},
				}),
				appRef.current,
		  )
		: EquippableButton({
				...props,
				position: props.position,
				onM1Down: (cursorOffset) => {
					setDragging(true);
					setCursorOffset(cursorOffset);
				},
		  });
}
