import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { TextService, TweenService } from "@rbxts/services";
import { selectDialogue } from "client/store/slices/gui/selectors";

const MAGIC_VECTOR = new Vector2(100, 100);

interface CharData {
	char: string;
	size: Vector2;
	font: Enum.Font;
}

interface CharLabelProps {
	char: string;
	font: Enum.Font;
	positionX: number;
	positionY: number;
	size: Vector2;
	parent: Frame;
}

export function CharLabel(props: CharLabelProps): TextLabel {
	const label = new Instance("TextLabel");
	label.Text = props.char;
	label.Font = Enum.Font.SourceSans;
	label.BackgroundTransparency = 1;
	label.TextTransparency = 0.6;
	label.ZIndex = 8;
	label.Visible = false;
	label.Position = UDim2.fromOffset(props.positionX, props.positionY);
	label.Size = UDim2.fromOffset(props.size.X, props.size.Y + 8);
	label.TextColor3 = new Color3(1, 1, 1);
	label.TextXAlignment = Enum.TextXAlignment.Left;
	label.Parent = props.parent;

	return label;
}

function containsWhitespace(str: string): boolean {
	return string.match(str, "%s")[0] !== undefined;
}

export function Dialogue() {
	const [currentText, setCurrentText] = useState("");
	const text = useSelector(selectDialogue);

	const labelContainer = useRef<Frame>();
	useEffect(() => {
		if (text === undefined) return;

		setCurrentText(text);
		let lastWait = 0.1;
		let [positionX, positionY] = [0, 0];
		const labels = new Array<TextLabel>();
		let lastChar = "";

		const textLength = text.size();

		labelContainer.current?.ClearAllChildren();

		for (let i = 1; i <= textLength; i++) {
			let waitTime = 0;

			const char = text.sub(i, i);
			const font = Enum.Font.SourceSans;
			const size = TextService.GetTextSize(
				char,
				20,
				font,
				new Vector2(100, 100),
			);
			const currentCharIsWhitespace = containsWhitespace(char);

			if (positionX + size.X > 450) {
				waitTime += 0.1;
				positionX = 0;
				positionY += size.Y;
			}

			if (!currentCharIsWhitespace) {
				const label = CharLabel({
					char: char,
					font: font,
					positionX: positionX,
					positionY: positionY,
					size: size,
					parent: labelContainer.current!,
				});
				labels.push(label);

				task.delay(lastWait, () => {
					label.Visible = true;
					label.TextSize = 28;
					TweenService.Create(label, new TweenInfo(0.15), {
						TextSize: 20,
						TextTransparency: 0,
					}).Play();
				});
			}

			if (positionX === 0) {
				if (!currentCharIsWhitespace) {
					positionX += size.X;
				}
			} else {
				positionX += size.X;
			}

			if (currentCharIsWhitespace) {
				waitTime += 0.01;
			} else {
				switch (char) {
					case "?":
					case "!":
						waitTime += 0.1;
						break;
					case ",":
						waitTime += 0.2;
						break;
					case ".":
						waitTime += 0.3;
						break;
					default:
						waitTime += 0.03;
				}
			}

			lastChar = char;
			lastWait = waitTime;
			task.wait(waitTime);
		}
	}, [text]);

	return (
		<imagelabel
			key="MainFrame"
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image="rbxassetid://1327087642"
			ImageTransparency={0.6}
			Position={new UDim2(0.5, 0, 1, -240)}
			ScaleType={Enum.ScaleType.Slice}
			Size={new UDim2(0, 500, 0, 100)}
			SliceCenter={new Rect(20, 20, 190, 190)}
			ZIndex={6}
			Visible={text !== ""}
		>
			<textlabel
				key="NameLabel"
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSansSemibold}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.SemiBold,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0, 25, 0, -4)}
				Size={new UDim2(1, -40, 0, 22)}
				Text="[name]"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={22}
				TextStrokeTransparency={0.8}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={8}
			>
				<textlabel
					key="Shadow"
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSansSemibold}
					FontFace={
						new Font(
							"rbxasset://fonts/families/SourceSansPro.json",
							Enum.FontWeight.SemiBold,
							Enum.FontStyle.Normal,
						)
					}
					Position={new UDim2(0, 2, 0, 2)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="[name]"
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextSize={22}
					TextTransparency={0.7}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					ZIndex={7}
				/>
			</textlabel>
			<frame
				key="Choices"
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 1, -5)}
				Size={new UDim2(1, 0, 0, 40)}
			>
				<uigridlayout
					CellSize={new UDim2(1, -5, 1, 0)}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			</frame>
			<textlabel
				key="Words"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSans}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Regular,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				RichText={true}
				Size={new UDim2(1, -40, 1, -40)}
				Text="[dialogue]"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextSize={18}
				TextStrokeTransparency={0.8}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Top}
				Visible={false}
				ZIndex={8}
			/>
			<frame
				key="LabelContainer"
				ref={labelContainer}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, 450, 0, 70)}
				ZIndex={7}
			/>
		</imagelabel>
	);
}
