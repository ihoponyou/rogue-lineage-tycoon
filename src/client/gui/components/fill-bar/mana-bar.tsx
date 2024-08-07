import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { deserializeColor3 } from "shared/modules/serialized-color3";
import { selectManaColor } from "shared/store/slices/identity/selectors";
import { selectManaAmount } from "shared/store/slices/mana/selectors";
import { FillBar } from ".";

// const MANA_TWEEN_INFO = new TweenInfo(
// 	0.1,
// 	Enum.EasingStyle.Sine,
// 	Enum.EasingDirection.Out,
// );

// updateMana(deltaTime: number): void {
// 		if (!this.manaSlider) return;

// 		this.manaTweenTimeStep += deltaTime;
// 		if (this.manaTweenTimeStep <= 0.1) return;

// 		TweenService.Create(this.manaSlider, MANA_TWEEN_INFO, {
// 			Size: UDim2.fromScale(1, this.manaController.mana / 100),
// 		}).Play();

// 		this.manaTweenTimeStep = 0;
// 	}

export function ManaBar() {
	const serializedManaColor = useSelector(selectManaColor());
	const manaColor =
		serializedManaColor !== undefined
			? deserializeColor3(serializedManaColor)
			: new Color3(1, 1, 1);

	const manaAmount = useSelector(selectManaAmount()) ?? -1;

	return (
		<frame
			key="LeftContainer"
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0, 0, 0.9, -70)}
			Selectable={true}
			Size={new UDim2(0, 50, 0.3, 50)}
			SizeConstraint={Enum.SizeConstraint.RelativeYY}
			ZIndex={4}
		>
			<frame
				key="ManaBar"
				AnchorPoint={new Vector2(1, 1)}
				BackgroundColor3={Color3.fromRGB(88, 69, 78)}
				BorderSizePixel={0}
				Position={new UDim2(1, 0, 1, 0)}
				Size={new UDim2(0, 28, 1, 0)}
				ZIndex={4}
			>
				<FillBar
					name="ManaSlider"
					amount={manaAmount}
					maxAmount={100}
					barColor={manaColor}
					barSizeFn={(percent) => new UDim2(1, 0, percent, 0)}
					barAnchorPoint={Vector2.yAxis}
					barPosition={UDim2.fromScale(0, 1)}
					dividerColor={Color3.fromRGB(88, 69, 78)}
					dividerPosition={new UDim2(0, 0, 0, -1)}
					dividerSize={new UDim2(1, 0, 0, 1)}
					zIndex={4}
				/>
				<imagelabel
					key="Overlay"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Image="rbxassetid://2560546833"
					ImageColor3={Color3.fromRGB(245, 197, 130)}
					Position={new UDim2(0.5, 0, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 14, 1, 3)}
					SliceCenter={new Rect(13, 19, 13, 19)}
					ZIndex={4}
				/>
			</frame>
		</frame>
	);
}
