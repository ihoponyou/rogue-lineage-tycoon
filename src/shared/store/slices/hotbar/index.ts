import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { Array } from "@rbxts/sift";
import { MAX_HOTBAR_SLOTS } from "shared/configs/constants";
import { EquippableId } from "shared/modules/equippable";
import { PlayerProfileData } from "shared/modules/player-data";

const EMPTY_VALUE = "";

export type HotbarState = ReadonlyArray<typeof EMPTY_VALUE | EquippableId>;

export const DEFAULT_HOTBAR_STATE: HotbarState = Array.create(12, EMPTY_VALUE);

export const hotbarSlice = createProducer(DEFAULT_HOTBAR_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.hotbar;
	},

	addToHotbar: (state, id: EquippableId, slot?: number) => {
		if (state.includes(id) && slot === undefined) return state;
		if (slot !== undefined && (slot < 0 || slot > MAX_HOTBAR_SLOTS - 1))
			return state;

		return Immut.produce(state, (draft) => {
			// if no slot given, put it wherever it fits
			if (slot === undefined) {
				for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
					if (state[i] === EMPTY_VALUE) {
						draft[i] = id;
						break;
					}
				}
			} else {
				const oldIndex = state.indexOf(id);
				if (oldIndex !== -1) {
					draft[oldIndex] = EMPTY_VALUE;
				}

				const idAtSlot = state[slot];
				if (idAtSlot === EMPTY_VALUE) {
					// if the slot is unoccupied
					draft[oldIndex] = idAtSlot;
					draft[slot] = id;
				} else if (oldIndex !== -1) {
					// if the slot is occupied and the id already exists in the hotbar
					const temp = state[slot];
					draft[slot] = id;
					draft[oldIndex] = temp;
				}
			}
		});
	},

	removeFromHotbar: (state, id: EquippableId) => {
		const index = state.indexOf(id);
		if (index === -1) return state;

		return Immut.produce(state, (draft) => {
			draft[index] = EMPTY_VALUE;
		});
	},
});
