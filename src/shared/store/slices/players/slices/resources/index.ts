import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "../player-data";

const BASE_STOMACH_DECAY_RATE = 0.1;
const BASE_TOXICITY_DECAY_RATE = 0.05;

export interface Resources {
	readonly health: number;
	readonly stomach: number;
	readonly temperature: number;
	readonly toxicity: number;
}

export interface ResourcesState {
	readonly [playerId: string]: Resources | undefined;
}

export const resourcesSlice = createProducer({} as ResourcesState, {
	loadPlayerData: (state, playerId: string | number, data: PlayerData) => ({
		...state,
		[tostring(playerId)]: data.resources,
	}),

	releasePlayerData: (state, playerId: string | number) => ({
		...state,
		[tostring(playerId)]: undefined,
	}),

	setHealth: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				health: value,
			},
		};
	},

	setStomach: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				stomach: value,
			},
		};
	},

	decayStomach: (state, playerId: string | number, deltaTime: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				stomach: math.max(
					0,
					resources.stomach - BASE_STOMACH_DECAY_RATE * deltaTime,
				),
			},
		};
	},

	setTemperature: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				temperature: value,
			},
		};
	},

	setToxicity: (state, playerId: string | number, value: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				toxicity: value,
			},
		};
	},

	decayToxicity: (state, playerId: string | number, deltaTime: number) => {
		const id = tostring(playerId);
		const resources = state[id];

		return {
			...state,
			[id]: resources && {
				...resources,
				toxicity: math.max(
					0,
					resources.toxicity - BASE_TOXICITY_DECAY_RATE * deltaTime,
				),
			},
		};
	},
});
