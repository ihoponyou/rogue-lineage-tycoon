// import { Debris } from "@rbxts/services";

const RAY_THICKNESS = 0.05;

export function createVisualizer(
	from: Vector3,
	to: Vector3,
	duration: number,
): void {
	const visualizer = new Instance("Part");
	visualizer.Parent = game.Workspace;

	visualizer.Anchored = true;
	visualizer.CanCollide = false;
	visualizer.CanQuery = false;
	visualizer.CanTouch = false;

	visualizer.BrickColor = BrickColor.Red();
	visualizer.Material = Enum.Material.Neon;
	visualizer.Transparency = 0.8;

	const distance: number = to.sub(from).Magnitude;
	visualizer.Size = new Vector3(RAY_THICKNESS, RAY_THICKNESS, distance);
	visualizer.CFrame = new CFrame(from, to).mul(
		new CFrame(0, 0, -distance / 2),
	);
}
