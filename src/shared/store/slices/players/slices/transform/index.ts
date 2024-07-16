import { createProducer } from "@rbxts/reflex";
import { SerializedVector3, serializeVector3 } from "shared/serialized-vector3";
import { PlayerData } from "../player-data";

export interface TransformData {
	position: SerializedVector3;
	yRotation: number;
}

export interface LocationState {
	readonly [playerId: string]: TransformData | undefined;
}

export const DEFAULT_TRANSFORM_DATA: TransformData = {
	position: {
		X: 0,
		Y: 0,
		Z: 0,
	},
	yRotation: 0,
};

export const transformSlice = createProducer({} as LocationState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.transform,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	resetLifeValues: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: DEFAULT_TRANSFORM_DATA,
	}),

	setPosition: (state, playerId: string | number, position: Vector3) => {
		const id = tostring(playerId);
		const transform = state[id];

		return {
			...state,
			[id]: transform && {
				...transform,
				position: serializeVector3(position),
			},
		};
	},

	setRotation: (state, playerId: string | number, rotation: number) => {
		const id = tostring(playerId);
		const transform = state[id];

		return {
			...state,
			[id]: transform && {
				...transform,
				yRotation: rotation,
			},
		};
	},
});
