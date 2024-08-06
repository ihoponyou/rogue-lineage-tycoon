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
	const [dragging, setDragging] = useState(false);
	const app = useContext(appContext);

	useEventListener(RunService.RenderStepped, (_deltaTime) => {
		if (!dragging) return;

		const mousePos = UserInputService.GetMouseLocation().sub(
			GuiService.GetGuiInset()[0],
		);
		if (
			!UserInputService.IsMouseButtonPressed(
				Enum.UserInputType.MouseButton1,
			)
		) {
			// there should only be one but plural because
			const hoveredSlots = LOCAL_PLAYER_GUI.GetGuiObjectsAtPosition(
				mousePos.X,
				mousePos.Y,
			).filter((value) => value.Name === "EmptySlot");

			if (hoveredSlots.size() > 0) {
				const slot = hoveredSlots[0].LayoutOrder;
				store.addToHotbar(slot, props.tool);
			}

			setDragging(false);
			return;
		}

		setPosition(UDim2.fromOffset(mousePos.X, mousePos.Y));
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
				onClick: () => setDragging(true),
			});
}
