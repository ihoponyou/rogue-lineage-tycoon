import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "../player-data";

export const classesSlice = createProducer([] as ReadonlyArray<string>, {
	loadPlayerData: (_state, data: PlayerData) => {
		return data.skills;
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
