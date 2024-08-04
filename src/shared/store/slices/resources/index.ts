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

export const DEFAULT_RESOURCES: Resources = {
	health: 100,
	stomach: 100,
	toxicity: 0,
	temperature: 50,
};

export const resourcesSlice = createProducer(DEFAULT_RESOURCES, {
	loadPlayerData: (_state, data: PlayerData) => data.resources,

	resetLifeValues: (_state) => DEFAULT_RESOURCES,

	setHealth: (state, value: number) => {
		return {
			...state,
			health: value,
		};
	},

	setStomach: (state, value: number) => {
		return {
			...state,
			stomach: value,
		};
	},

	decayStomach: (state, deltaTime: number) => {
		return {
			...state,
			stomach: math.max(
				0,
				state.stomach - BASE_STOMACH_DECAY_RATE * deltaTime,
			),
		};
	},

	setTemperature: (state, value: number) => {
		return {
			...state,
			temperature: value,
		};
	},

	setToxicity: (state, value: number) => {
		return {
			...state,
			toxicity: value,
		};
	},

	decayToxicity: (state, deltaTime: number) => {
		return {
			...state,
			toxicity: math.max(
				0,
				state.toxicity - BASE_TOXICITY_DECAY_RATE * deltaTime,
			),
		};
	},
});
