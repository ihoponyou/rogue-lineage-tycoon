export function cframeFromOrientationDeg(
	x: number = 0,
	y: number = 0,
	z: number = 0,
): CFrame {
	return CFrame.fromOrientation(math.rad(x), math.rad(y), math.rad(z));
}
