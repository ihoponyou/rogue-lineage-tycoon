import { Debris, Workspace } from "@rbxts/services";

export function raycastWithVisualizer(
	origin: Vector3,
	direction: Vector3,
	params?: RaycastParams,
	duration?: number,
): RaycastResult | undefined {
	const visualizer = new Instance("Part");
	const destination = origin.add(direction);
	visualizer.CFrame = new CFrame(origin.add(direction.mul(0.5)), destination);
	visualizer.Size = new Vector3(0.1, 0.1, direction.Magnitude);
	visualizer.Anchored = true;
	visualizer.Transparency = 0.8;
	visualizer.Material = Enum.Material.Neon;

	const raycastResult = Workspace.Raycast(origin, direction, params);
	visualizer.Color =
		raycastResult !== undefined
			? Color3.fromRGB(0, 255, 0)
			: Color3.fromRGB(255, 0, 0);

	visualizer.Parent = Workspace;
	visualizer.Name = `RAY: ${origin} => ${direction}`;
	if (duration !== undefined) {
		Debris.AddItem(visualizer, duration);
	}

	return raycastResult;
}
