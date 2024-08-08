import { InferState, combineProducers } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";
import { dialogueSlice } from "./slices/dialogue";
import { guiSlice } from "./slices/gui";

export type RootState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
	dialogue: dialogueSlice,
	gui: guiSlice,
}).applyMiddleware(receiverMiddleware());
