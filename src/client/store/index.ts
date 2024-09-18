import {
	InferState,
	ProducerMiddleware,
	combineProducers,
	createBroadcastReceiver,
} from "@rbxts/reflex";
import { Events } from "client/network";
import slices from "shared/store/slices";
import { dialogueSlice } from "./slices/dialogue";
import { guiSlice } from "./slices/gui";

export type RootState = InferState<typeof store>;

function receiverMiddleware(): ProducerMiddleware {
	const receiver = createBroadcastReceiver({
		start: () => {
			Events.reflex.start();
		},
	});

	Events.reflex.dispatch.connect((actions) => {
		receiver.dispatch(actions);
	});

	Events.reflex.hydrate.connect((state) => {
		store.loadPlayerData(state);
	});

	return receiver.middleware;
}

export const store = combineProducers({
	...slices,
	dialogue: dialogueSlice,
	gui: guiSlice,
}).applyMiddleware(receiverMiddleware());
