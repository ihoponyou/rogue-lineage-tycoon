import React, { PropsWithChildren } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { MAX_HOTBAR_SLOTS } from "shared/configs/constants";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { EmptySlot } from "./empty-slot";

const PX_PER_SLOT = 72;
const MAX_HOTBAR_SIZE_X_PX = (MAX_HOTBAR_SLOTS - 1) * PX_PER_SLOT;

export function Hotbar(props: PropsWithChildren) {
	const isBackpackOpen = useSelector(selectIsBackpackOpen());
	const hotbar = useSelector(selectHotbar());

	const sizeX = isBackpackOpen ? MAX_HOTBAR_SIZE_X_PX : PX_PER_SLOT * (hotbar.size() - 1);

	const emptySlots = new Array<JSX.Element>();
	// if (isBackpackOpen) {
	for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
		emptySlots.push(
			<EmptySlot slot={i} visible={true} position={UDim2.fromScale(i / (MAX_HOTBAR_SLOTS - 1), 0)} />,
		);
	}
	// }

	return (
		<>
			<frame
				key="Hotbar"
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 1, -10)}
				Size={UDim2.fromOffset(sizeX, 60)}
			>
				{!isBackpackOpen && (
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0, 10)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
				)}
				{props.children}
			</frame>
			<frame
				key={"EmptyHotbarSlots"}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 1, -10)}
				Size={UDim2.fromOffset(MAX_HOTBAR_SIZE_X_PX, 60)}
				Visible={isBackpackOpen}
			>
				{emptySlots}
			</frame>
		</>
	);
}
