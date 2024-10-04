import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useBinding, useContext, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { GuiService, RunService, UserInputService } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/constants";
import { appContext } from "client/gui/context";
import { useRootProducer } from "client/gui/hooks/reflex-hooks";
import { selectActiveEquippable } from "client/store/slices/gui/selectors";
import { EquippableButtonProps, ItemButton } from "./item-button";

export function DraggableItemButton(props: EquippableButtonProps) {
	const app = useContext(appContext);
	const { removeFromHotbar, addToHotbar } = useRootProducer();

	const activeTool = useSelector(selectActiveEquippable());
	const hasTool = false; //useSelector(selectHotbarHasTool(props.equippable));

	const [position, setPosition] = useBinding(new UDim2());
	const [cursorOffset, setCursorOffset] = useState(Vector2.zero);
	const [dragging, setDragging] = useState(false);

	useEventListener(RunService.RenderStepped, (_deltaTime) => {
		if (!dragging) return;

		const inset = GuiService.GetGuiInset()[0];
		const mousePos = UserInputService.GetMouseLocation().sub(inset);
		setPosition(
			UDim2.fromOffset(
				mousePos.X + cursorOffset.X + inset.X + 30,
				mousePos.Y + cursorOffset.Y + inset.Y,
			),
		);
	});

	return dragging && app?.current
		? createPortal(
				ItemButton({
					...props,
					positionBinding: position,
					dragging: true,
					onM1Up: (screenPos) => {
						setDragging(false);

						const hoveredObjects =
							LOCAL_PLAYER_GUI.GetGuiObjectsAtPosition(
								screenPos.X,
								screenPos.Y,
							);
						const index = hoveredObjects.findIndex(
							(object) => object.Name === "EmptySlot",
						);
						const object = hoveredObjects[index];
						let transferred = false;
						if (object === undefined) {
							transferred = hasTool;
							// removeFromHotbar(props.equippable);
						} else {
							transferred =
								!hasTool || object.LayoutOrder !== props.slot;
							// addToHotbar(object.LayoutOrder, props.equippable.instance);
						}
						if (!transferred) {
							// const newTool =
							// props.equippable === activeTool
							// 	? undefined
							// 	: props.equippable;
							// setActiveTool(newTool);
						}
					},
				}),
				app.current,
			)
		: ItemButton({
				...props,
				position: props.position,
				onM1Down: (cursorOffset) => {
					setDragging(true);
					setCursorOffset(cursorOffset);
				},
			});
}
