export interface SerializedColor3 {
	readonly R: number;
	readonly G: number;
	readonly B: number;
}

export function serializeColor3(color: Color3): SerializedColor3 {
	return {
		R: color.R,
		G: color.G,
		B: color.B,
	};
}

export function deserializeColor3(serializedColor: SerializedColor3): Color3 {
	return new Color3(serializedColor.R, serializedColor.G, serializedColor.B);
}
