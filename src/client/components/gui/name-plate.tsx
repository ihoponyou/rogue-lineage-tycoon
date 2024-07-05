import { useEventListener } from "@rbxts/pretty-react-hooks";
import React = require("@rbxts/react");
import { Events } from "client/networking";

const NAME_FONT = new Font("rbxasset://fonts/families/RomanAntique.json");

export function NamePlate() {
	const [text, setText] = React.useBinding("");
	useEventListener(Events.character.firstNameChanged, (name) =>
		setText(name.upper()),
	);

	return (
		<textlabel
			key="CharacterName"
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
			Font={Enum.Font.Antique}
			FontFace={NAME_FONT}
			Position={new UDim2(0, 3, 1, -26)}
			Size={new UDim2(1, -32, 0, 20)}
			Text={text}
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
				Text={text}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextSize={20}
				TextTransparency={0.75}
				TextXAlignment={Enum.TextXAlignment.Left}
				ZIndex={90}
			/>
		</textlabel>
	);
}
