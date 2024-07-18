import { useAsyncEffect } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { TextService, TweenService } from "@rbxts/services";
import {
	selectDialogueOptions,
	selectDialogueText,
	selectSpeakerName,
} from "client/store/slices/dialogue/selectors";
import { CharLabel } from "./char-label";

const FRAME_SIZE = new Vector2(100, 100);
const CHARACTER_FONT_SIZE = 20;
const CHARACTER_FONT = Enum.Font.SourceSans;
const CHARACTER_TWEEN_INFO = new TweenInfo(0.15);

function containsWhitespace(str: string): boolean {
	return string.match(str, "%s")[0] !== undefined;
}

export function DialogueBox() {
	const text = useSelector(selectDialogueText);
	const characterContainer = useRef<Frame>();
	useAsyncEffect(async () => {
		if (text === undefined) return;

		return new Promise((resolve, reject, onCancel) => {
			let lastWait = 0.1;
			let [positionX, positionY] = [0, 0];

			const textLength = text.size();

			characterContainer.current?.ClearAllChildren();

			for (let i = 1; i <= textLength; i++) {
				if (onCancel()) break;
				let waitTime = 0;

				const char = text.sub(i, i);
				const size = TextService.GetTextSize(
					char,
					CHARACTER_FONT_SIZE,
					CHARACTER_FONT,
					FRAME_SIZE,
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
						font: CHARACTER_FONT,
						positionX: positionX,
						positionY: positionY,
						size: size,
						parent: characterContainer.current!,
					});

					task.delay(lastWait, () => {
						label.Visible = true;
						label.TextSize = 28;
						TweenService.Create(label, CHARACTER_TWEEN_INFO, {
							TextSize: CHARACTER_FONT_SIZE,
							TextTransparency: 0,
						}).Play();
					});
				}

				positionX += size.X;

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

				lastWait = waitTime;
				task.wait(waitTime);
			}
		});
	}, [text]);

	const options = useSelector(selectDialogueOptions);
	const optionContainer = useRef<Frame>();
	useEffect(() => {
		let cancel = false;
		options.forEach((option) => {
			if (cancel) return;
			if (option.Parent === undefined) return;
			option.Parent = optionContainer.current;
		});

		return () => {
			cancel = true;
		};
	}, [options]);

	const speakerName = useSelector(selectSpeakerName);

	return (
		<imagelabel
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
				Text={speakerName ?? "[name]"}
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
				key="Options"
				ref={optionContainer}
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 1, -5)}
				Size={new UDim2(1, 0, 0, 40)}
			>
				<uigridlayout
					CellSize={new UDim2(1 / options.size(), -5, 1, 0)}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			</frame>
			<frame
				key="Characters"
				ref={characterContainer}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, 450, 0, 70)}
				ZIndex={7}
			/>
		</imagelabel>
	);
}
