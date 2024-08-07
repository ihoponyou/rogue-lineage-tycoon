import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import Ripple from "@rbxts/ripple";
import { GuiService } from "@rbxts/services";
import { useMotion } from "client/gui/hooks/use-motion";
import { selectHotbarHasTool } from "client/store/slices/gui/selectors";

export interface ItemButtonProps {
	tool: Tool;
	quantity: number;
	activeTool: Tool | undefined;
	setActiveTool: (tool?: Tool) => void;
	position?: UDim2;
	positionBinding?: React.Binding<UDim2>;
	slot?: number;
	dragging?: boolean;
	onM1Down?: (cursorOffset: Vector2) => void;
	onM1Up?: (screenPos: Vector2) => void;
}

const COLOR = {
	selected: Color3.fromRGB(255, 248, 238),
	deselected: Color3.fromRGB(215, 203, 191),
};

const SIZE = {
	selected: 10,
	deselected: 6,
};

const TEXT_TRANSPARENCY = {
	selected: 0,
	deselected: 0.2,
};

const TWEEN_OPTIONS: Ripple.TweenOptions = {
	time: 0.1,
};

// TODO: change with custom binds
const SLOT_LABELS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"0",
	"-",
	"=",
];

export function ItemButton(props: ItemButtonProps) {
	const quantity = 1;
	const inHotbar = useSelector(selectHotbarHasTool(props.tool));
	const [size, sizeMotion] = useMotion(SIZE.deselected);
	const [textTransparency, textTransparencyMotion] = useMotion(0);
	const [color, colorMotion] = useMotion(COLOR.deselected);

	const selected = props.tool === props.activeTool;
	sizeMotion.tween(selected ? SIZE.selected : SIZE.deselected, {
		...TWEEN_OPTIONS,
		style: selected ? Enum.EasingStyle.Back : undefined,
	});
	textTransparencyMotion.tween(
		selected ? TEXT_TRANSPARENCY.selected : TEXT_TRANSPARENCY.deselected,
		TWEEN_OPTIONS,
	);
	colorMotion.tween(
		selected || props.dragging ? COLOR.selected : COLOR.deselected,
		TWEEN_OPTIONS,
	);

	return (
		<textbutton
			key={props.tool.Name}
			Active={false}
			AnchorPoint={new Vector2(0.5, 0)}
			AutoButtonColor={false}
			BackgroundColor3={color}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font(
					"rbxasset://fonts/families/Balthazar.json",
					Enum.FontWeight.Regular,
					Enum.FontStyle.Normal,
				)
			}
			Selectable={false}
			Size={new UDim2(0, 60, 0, 60)}
			Text={props.tool.Name}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextTransparency={textTransparency}
			TextWrapped={true}
			Event={{
				MouseButton1Down: (rbx, x, y) => {
					if (props.onM1Down) {
						const inset = GuiService.GetGuiInset()[0];
						const mousePos = new Vector2(x, y).sub(inset);
						const diff = rbx.AbsolutePosition.sub(mousePos);
						props.onM1Down(diff);
					}
				},
				MouseButton1Up: (_rbx, x, y) => {
					if (props.onM1Up) {
						const inset = GuiService.GetGuiInset()[0];
						const mousePos = new Vector2(x, y).sub(inset);
						props.onM1Up(mousePos);
					}
				},
			}}
			Position={props.positionBinding ?? props.position}
			LayoutOrder={props.slot}
		>
			<imagelabel
				key="Overlay"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image="rbxassetid://3419850962"
				ImageColor3={Color3.fromRGB(245, 197, 130)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Slice}
				Size={size.map((value) => new UDim2(1, value, 1, value))}
				SliceCenter={new Rect(13, 13, 13, 13)}
			/>
			<textlabel
				key="Quantity"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSans}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Regular,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 1, 0)}
				Size={new UDim2(0, 20, 0, 12)}
				Text={`x${quantity}`}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				Visible={quantity > 1}
				ZIndex={2}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
			<textlabel
				key="Slot"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSansBold}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Bold,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(0, 16, 0, 12)}
				Text={props.slot !== undefined ? SLOT_LABELS[props.slot] : "?"}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				ZIndex={2}
				Visible={inHotbar}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
		</textbutton>
	);
}
