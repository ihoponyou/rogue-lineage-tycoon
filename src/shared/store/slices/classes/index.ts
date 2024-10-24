import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/modules/player-data";

export type ClassesState = ReadonlyArray<string>;

export const DEFAULT_CLASSES_STATE: ClassesState = [];

export const classesSlice = createProducer([] as ClassesState, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.classes;
	},

	resetLineageValues: (_state) => {
		return [];
	},

	addClass: (state, className: string) => {
		if (state.includes(className)) return state;

		return [...state, className];
	},

	removeClass: (state, className: string) => {
		if (!state.includes(className)) return state;

		return state.filter(
			(existingCondition) => existingCondition !== className,
		);
	},
});
