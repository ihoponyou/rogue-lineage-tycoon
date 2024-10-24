import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { Binding, useContext, useEffect, useState } from "@rbxts/react";
import { GuiService } from "@rbxts/services";
import { SLOT_LABELS } from "client/configs/constants";
import { Equippable } from "shared/modules/equippable";
import { singletonContext } from "../context/singleton";

export interface EquippableButtonProps {
	equippable: Equippable;
	equippableName: string;
	quantity?: number;
	slot?: number;
	position?: Binding<UDim2> | UDim2;
	onM1Up?: (mousePos: Vector2) => void;
	onM1Down?: (cursorOffset: Vector2) => void;
}

interface ButtonTheme {
	backgroundColor3: Color3;
	sizeOffset: number;
	textTransparency: number;
}

const THEMES: Record<"equipped" | "unequipped", ButtonTheme> = {
	equipped: {
		backgroundColor3: Color3.fromRGB(255, 248, 238),
		sizeOffset: 10,
		textTransparency: 0,
	},
	unequipped: {
		backgroundColor3: Color3.fromRGB(215, 203, 191),
		sizeOffset: 6,
		textTransparency: 0.2,
	},
};

const TWEEN_OPTIONS: Ripple.TweenOptions = {
	time: 0.1,
};

function calculateMouseScreenPos(mousePosWithInset: Vector2): Vector2 {
	const inset = GuiService.GetGuiInset()[0];
	return mousePosWithInset.sub(inset);
}

export function EquippableButton(props: EquippableButtonProps) {
	const controllers = useContext(singletonContext);

	const [isEquipped, setIsEquipped] = useState(props.equippable.isEquipped());
	useEffect(() => {
		const conn = props.equippable.onEquipChanged(setIsEquipped);
		return () => conn.Disconnect();
	}, [props.equippable]);

	const theme = THEMES[isEquipped ? "equipped" : "unequipped"];

	const [backgroundColor, backgroundColorMotion] = useMotion(THEMES.unequipped.backgroundColor3);
	const [sizeOffset, sizeOffsetMotion] = useMotion(THEMES.unequipped.sizeOffset);
	const [textTransparency, textTransparencyMotion] = useMotion(THEMES.unequipped.textTransparency);

	backgroundColorMotion.tween(theme.backgroundColor3, TWEEN_OPTIONS);
	sizeOffsetMotion.tween(theme.sizeOffset, {
		...TWEEN_OPTIONS,
		style: isEquipped ? Enum.EasingStyle.Back : undefined,
	});
	textTransparencyMotion.tween(theme.textTransparency, TWEEN_OPTIONS);

	return (
		<textbutton
			AnchorPoint={new Vector2(0.5, 0)}
			AutoButtonColor={false}
			BackgroundColor3={backgroundColor}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font("rbxasset://fonts/families/Balthazar.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
			}
			LayoutOrder={props.slot ?? -1}
			Position={props.position}
			Selectable={false}
			Size={UDim2.fromOffset(60, 60)}
			Text={props.equippableName}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextTransparency={textTransparency}
			TextWrapped={true}
			Event={{
				MouseButton1Down: (rbx, x, y) => {
					if (props.onM1Down) {
						props.onM1Down(rbx.AbsolutePosition.sub(calculateMouseScreenPos(new Vector2(x, y))));
					} else {
						const character = controllers.character.getCharacter();
						if (character === undefined) {
							warn("undefined character");
							return;
						}
						if (props.equippable.isEquipped()) {
							props.equippable.unequip(character);
						} else {
							props.equippable.equip(character);
						}
					}
				},
				MouseButton1Up: (_rbx, x, y) => {
					if (props.onM1Up) {
						props.onM1Up(calculateMouseScreenPos(new Vector2(x, y)));
					}
				},
			}}
		>
			<imagelabel
				key="Overlay"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image="rbxassetid://3419850962"
				ImageColor3={Color3.fromRGB(245, 197, 130)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Slice}
				Size={sizeOffset.map((value) => new UDim2(1, value, 1, value))}
				SliceCenter={new Rect(13, 13, 13, 13)}
			/>
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
				Text={props.slot !== undefined ? SLOT_LABELS[props.slot] : "oops"}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				ZIndex={2}
				Visible={props.slot !== undefined}
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
				Text={`x${tostring(props.quantity)}`}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				Visible={props.quantity !== undefined && props.quantity > 1}
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
		</textbutton>
	);
}
