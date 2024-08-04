import { InferState, combineProducers } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";
import { dialogueSlice } from "./slices/dialogue";

export type RootState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
	dialogue: dialogueSlice,
}).applyMiddleware(receiverMiddleware());
