import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import { receiverMiddleware } from "./middleware/receiver";
import { dialogueSlice } from "./slices/dialogue";

export type RootStore = typeof store;

export type RootState = InferState<RootStore>;

export function createStore() {
	const store = combineProducers({
		...slices,
		dialogue: dialogueSlice,
	});

	store.applyMiddleware(receiverMiddleware());

	return store;
}

export const store = createStore();
