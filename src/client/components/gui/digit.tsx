import React, { useEffect, useState } from "@rbxts/react";
import { useMotion } from "client/gui/hooks/use-motion";

// const ROLLER_TWEEN_INFO = new TweenInfo(0.15);

// private doRollerEffect(label: TextLabel, text: string) {
// 		const tween = TweenService.Create(label, ROLLER_TWEEN_INFO, {
// 			LineHeight: 3,
// 		});
// 		tween.Completed.Once(() => {
// 			task.wait(0.1);
// 			label.Text = text;
// 			label.LineHeight = 0;
// 			TweenService.Create(label, ROLLER_TWEEN_INFO, {
// 				LineHeight: 1,
// 			}).Play();
// 		});
// 		tween.Play();
// 	}

const DIGIT_FONT = new Font("rbxasset://fonts/families/HighwayGothic.json");
const DIGIT_SIZE = UDim2.fromOffset(12, 16);

export interface DigitProps {
	name?: string;
	value: number;
	position: UDim2;
}

export function Digit(props: DigitProps) {
	const [currentValue, setCurrentValue] = useState(props.value);
	const [verticalOffset, motion] = useMotion(0);
	let cleanup: (() => void) | undefined;

	useEffect(() => {
		motion.tween(DIGIT_SIZE.Y.Offset, {
			time: 0.15,
		});
		cleanup = motion.onComplete(() => {
			task.wait(0.1);
			motion.set(-DIGIT_SIZE.Y.Offset);
			setCurrentValue(props.value);
			motion.tween(0, {
				time: 0.2,
			});
			if (cleanup !== undefined) cleanup();
			cleanup = undefined;
		});
	}, [props.value]);

	return (
		<frame
			key={props.name}
			BackgroundTransparency={1}
			ClipsDescendants={true}
			Position={props.position}
			Size={DIGIT_SIZE}
			ZIndex={4}
		>
			<textlabel
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.Highway}
				FontFace={DIGIT_FONT}
				Position={verticalOffset.map(
					(value) => new UDim2(0, 0, 0.5, value),
				)}
				Size={new UDim2(1, 0, 1, 0)}
				Text={tostring(currentValue)}
				TextColor3={Color3.fromRGB(59, 43, 27)}
				TextSize={14}
				ZIndex={4}
			/>
		</frame>
	);
}
