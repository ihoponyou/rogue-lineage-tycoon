import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "./player-data";

const BASE_STOMACH_DECAY_RATE = 0.1;
const BASE_TOXICITY_DECAY_RATE = 0.05;

export interface Resources {
	readonly health: number;
	readonly stomach: number;
	readonly temperature: number;
	readonly toxicity: number;
}

export interface ResourcesState {
	readonly [playerId: number]: Resources | undefined;
}

export const resourcesSlice = createProducer({} as ResourcesState, {
	loadPlayerData: (state, playerId: number, data: PlayerData) => ({
		...state,
		[playerId]: data.resources,
	}),

	releasePlayerData: (state, playerId: number) => ({
		...state,
		[playerId]: undefined,
	}),

	setHealth: (state, playerId: number, value: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				health: value,
			},
		};
	},

	setStomach: (state, playerId: number, value: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				stomach: value,
			},
		};
	},

	decayStomach: (state, playerId: number, deltaTime: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				stomach: math.max(
					0,
					resources.stomach - BASE_STOMACH_DECAY_RATE * deltaTime,
				),
			},
		};
	},

	setTemperature: (state, playerId: number, value: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				temperature: value,
			},
		};
	},

	setToxicity: (state, playerId: number, value: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				toxicity: value,
			},
		};
	},

	decayToxicity: (state, playerId: number, deltaTime: number) => {
		const resources = state[playerId];

		return {
			...state,
			[playerId]: resources && {
				...resources,
				toxicity: math.max(
					0,
					resources.toxicity - BASE_TOXICITY_DECAY_RATE * deltaTime,
				),
			},
		};
	},
});
