export function getCharacterFromBodyPart(part: BasePart): Model | undefined {
	if (!part.Parent) return;
	if (!(part.Parent.ClassName === "Model")) return;
	if (!part.Parent.FindFirstChildOfClass("Humanoid")) return;
	return part.Parent as Model;
}
