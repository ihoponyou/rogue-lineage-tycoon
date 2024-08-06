import React, { useContext } from "@rbxts/react";
import { signalContext } from "client/gui/context";
import { useMotion } from "client/gui/hooks/use-motion";

export interface ItemButtonProps {
	tool: Tool;
	activeTool?: Tool;
	setActiveTool: React.Dispatch<React.SetStateAction<Tool | undefined>>;
	position?: React.Binding<UDim2>;
	onClick?: () => void;
}

const COLOR = {
	selected: Color3.fromRGB(255, 248, 238),
	deselected: Color3.fromRGB(215, 203, 191),
};

const SIZE = {
	selected: 10,
	deselected: 6,
};

export function ItemButton({
	tool,
	activeTool,
	setActiveTool,
	position,
	onClick,
}: ItemButtonProps) {
	const signal = useContext(signalContext);

	const quantity = 1;
	const inHotbar = false;
	const [size, sizeMotion] = useMotion(SIZE.deselected);
	const [textTransparency, textTransparencyMotion] = useMotion(0);
	const [color, colorMotion] = useMotion(COLOR.deselected);

	const selected = tool === activeTool;
	sizeMotion.tween(selected ? SIZE.selected : SIZE.deselected, {
		time: 0.1,
		style: selected ? Enum.EasingStyle.Back : undefined,
	});
	textTransparencyMotion.tween(selected ? 0 : 0.2, { time: 0.1 });
	colorMotion.tween(selected ? COLOR.selected : COLOR.deselected, {
		time: 0.1,
	});

	return (
		<textbutton
			key={tool.Name}
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
			Text={tool.Name}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextTransparency={textTransparency}
			TextWrapped={true}
			Event={{
				MouseButton1Down: () => {
					if (onClick) onClick();
					setActiveTool(!selected ? tool : undefined);
					signal.Fire(!selected ? tool : undefined);
				},
			}}
			Position={position}
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
				Text="?"
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
