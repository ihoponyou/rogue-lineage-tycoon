import { InferState, combineProducers } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";
import { dialogueSlice } from "./slices/dialogue";
import { equippablesSlice } from "./slices/equippables";
import { uiSlice } from "./slices/ui";

export type RootClientState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
	dialogue: dialogueSlice,
	ui: uiSlice,
	equippables: equippablesSlice,
}).applyMiddleware(receiverMiddleware());
