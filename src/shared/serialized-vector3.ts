export interface SerializedVector3 {
	readonly X: number;
	readonly Y: number;
	readonly Z: number;
}

export function serializeVector3(vector: Vector3): SerializedVector3 {
	return {
		X: vector.X,
		Y: vector.Y,
		Z: vector.Z,
	};
}

export function deserializeVector3(
	serializedVector: SerializedVector3,
): Vector3 {
	return new Vector3(
		serializedVector.X,
		serializedVector.Y,
		serializedVector.Z,
	);
}
