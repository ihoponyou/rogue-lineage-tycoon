import { Debris, Workspace } from "@rbxts/services";

export function spawnHitbox(
	cframe: CFrame,
	size: Vector3,
	filter?: Instance[],
	visualize = false,
): Model[] {
	const overlapParams = new OverlapParams();
	overlapParams.CollisionGroup = "Characters";
	overlapParams.FilterType = Enum.RaycastFilterType.Exclude;
	filter?.forEach((instance) => overlapParams.AddToFilter(instance));

	const parts = Workspace.GetPartBoundsInBox(cframe, size, overlapParams);
	if (visualize) spawnVisualizer(cframe, size);
	const hits: Model[] = [];
	parts.forEach((basePart) => {
		const parent = basePart.Parent as Model | undefined;
		if (parent === undefined) return;
		if (parent.ClassName !== "Model") return;
		if (hits.includes(parent)) return;
		if (!parent.HasTag("Character")) return;
		hits.push(parent);
	});

	return hits;
}

export function spawnVisualizer(
	cframe: CFrame,
	size: Vector3,
	duration = 0.5,
): void {
	const part = new Instance("Part");
	part.Parent = Workspace;
	part.Anchored = true;
	part.Color = Color3.fromRGB(255);
	part.CFrame = cframe;
	part.Size = size;
	part.Transparency = 0.8;
	part.CanCollide = false;
	part.CanQuery = false;
	part.CanTouch = false;
	Debris.AddItem(part, duration);
}
