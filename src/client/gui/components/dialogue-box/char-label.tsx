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
