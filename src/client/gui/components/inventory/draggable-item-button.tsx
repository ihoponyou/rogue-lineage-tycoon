import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useBinding, useContext, useState } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { RunService, UserInputService } from "@rbxts/services";
import { appContext } from "client/gui/context";
import { ItemButton, ItemButtonProps } from "./item-button";

export function DraggableItemButton(props: ItemButtonProps) {
	const [position, setPosition] = useBinding(new UDim2());
	const [dragging, setDragging] = useState(false);
	const app = useContext(appContext);

	useEventListener(RunService.RenderStepped, (_deltaTime) => {
		if (!dragging) return;
		if (
			!UserInputService.IsMouseButtonPressed(
				Enum.UserInputType.MouseButton1,
			)
		) {
			setDragging(false);
			return;
		}

		// portal to the screengui

		// set position
		const mousePos = UserInputService.GetMouseLocation();
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
