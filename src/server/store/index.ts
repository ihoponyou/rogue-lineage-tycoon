import { InferState, combineProducers } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { addMultiplayer } from "./add-multiplayer";
import { broadcasterMiddleware } from "./middleware/broadcaster";

export type RootState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
})
	.enhance(addMultiplayer)
	.applyMiddleware(broadcasterMiddleware());
