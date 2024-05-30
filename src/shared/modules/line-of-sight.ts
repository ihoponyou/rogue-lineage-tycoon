import { Workspace } from "@rbxts/services";

export function hasLineOfSight(
	from: Vector3,
	to: Vector3,
	params: RaycastParams,
): boolean {
	const diff = to.sub(from);
	const cast = Workspace.Raycast(from, to.sub(from), params);
	return cast !== undefined && diff.Magnitude - cast.Distance > 0.1;
}
