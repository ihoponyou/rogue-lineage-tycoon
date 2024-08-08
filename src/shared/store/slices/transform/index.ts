import { createProducer } from "@rbxts/reflex";
import {
	SerializedVector3,
	serializeVector3,
} from "shared/modules/serialized-vector3";
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

export const transformSlice = createProducer(DEFAULT_TRANSFORM_DATA, {
	loadPlayerData: (_state, data: PlayerData) => data.transform,

	resetLifeValues: (_state) => DEFAULT_TRANSFORM_DATA,

	setPosition: (state, position: Vector3) => {
		return {
			...state,
			position: serializeVector3(position),
		};
	},

	setRotation: (state, rotation: number) => {
		return {
			...state,
			yRotation: rotation,
		};
	},
});
