import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useBinding, useContext, useState } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { GuiService, RunService, UserInputService } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/constants";
import { appContext } from "client/gui/context";
import { store } from "client/store";
import { ItemButton, ItemButtonProps } from "./item-button";

export function DraggableItemButton(props: ItemButtonProps) {
	const [position, setPosition] = useBinding(new UDim2());
	const [cursorOffset, setCursorOffset] = useState(Vector2.zero);
	const [dragging, setDragging] = useState(false);
	const app = useContext(appContext);

	useEventListener(RunService.RenderStepped, (_deltaTime) => {
		if (!dragging) return;

		const inset = GuiService.GetGuiInset()[0];
		const mousePos = UserInputService.GetMouseLocation().sub(inset);
		if (
			!UserInputService.IsMouseButtonPressed(
				Enum.UserInputType.MouseButton1,
			)
		) {
			const hoveredObjects = LOCAL_PLAYER_GUI.GetGuiObjectsAtPosition(
				mousePos.X,
				mousePos.Y,
			);

			const index = hoveredObjects.findIndex(
				(object) =>
					object.Name === "EmptySlot" || object.Name === "Backpack",
			);
			const object = hoveredObjects[index];
			if (object === undefined) {
				// is this cursed?
			} else if (object.Name === "EmptySlot") {
				store.addToHotbar(props.tool, object.LayoutOrder);
			} else if (object.Name === "Backpack") {
				store.removeFromHotbar(props.tool);
			}

			setDragging(false);
			return;
		}

		setPosition(
			UDim2.fromOffset(
				mousePos.X + cursorOffset.X + inset.X,
				mousePos.Y + cursorOffset.Y + inset.Y,
			),
		);
	});

	return dragging && app?.current
		? createPortal(
				ItemButton({
					...props,
					position: position,
				}),
				app.current,
			)
		: ItemButton({
				...props,
				position: position,
				onClick: (relativeToCursor) => {
					setCursorOffset(relativeToCursor);
					setDragging(true);
				},
			});
}
