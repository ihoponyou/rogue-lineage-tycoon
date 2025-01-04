import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { Equippable } from "shared/modules/equippable";

export const equippablesSlice = createProducer(
	new Map() as ReadonlyMap<string, Equippable>,
	{
		addEquippable: (
			state,
			instanceName: string,
			equippable: Equippable,
		) => {
			if (state.has(instanceName)) return state;

			return Immut.produce(state, (draft) => {
				draft.set(instanceName, equippable);
			});
		},

		removeEquippable: (state, instanceName: string) => {
			if (!state.has(instanceName)) return state;

			return Immut.produce(state, (draft) => {
				draft.delete(instanceName);
			});
		},
	},
);
