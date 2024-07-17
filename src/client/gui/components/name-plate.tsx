import { useSelector } from "@rbxts/react-reflex";
import { LOCAL_PLAYER } from "client/constants";
import { selectFirstName } from "shared/store/slices/players/slices/identity/selectors";
import React = require("@rbxts/react");

const NAME_FONT = new Font("rbxasset://fonts/families/RomanAntique.json");

export function NamePlate() {
	const firstName = useSelector(selectFirstName(LOCAL_PLAYER.UserId));

	return (
		<textlabel
			key="CharacterName"
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
			Font={Enum.Font.Antique}
			FontFace={NAME_FONT}
			Position={new UDim2(0, 3, 1, -26)}
			Size={new UDim2(1, -32, 0, 20)}
			Text={firstName?.upper()}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			TextSize={20}
			TextStrokeColor3={Color3.fromRGB(112, 95, 67)}
			TextStrokeTransparency={0}
			TextXAlignment={Enum.TextXAlignment.Left}
			ZIndex={90}
		>
			<textlabel
				key="Shadow"
				BackgroundTransparency={1}
				Font={Enum.Font.Antique}
				FontFace={NAME_FONT}
				Position={new UDim2(0, 2, 0, 1)}
				Size={new UDim2(1, 0, 1, 0)}
				Text={firstName?.upper()}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextSize={20}
				TextTransparency={0.75}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={90}
			/>
		</textlabel>
	);
}
