import {
	InferState,
	ProducerMiddleware,
	combineProducers,
	createBroadcaster,
} from "@rbxts/reflex";
import { Events } from "server/network";
import slices from "shared/store/slices";
import { addMultiplayer } from "./add-multiplayer";

export type RootState = InferState<typeof store>;

function broadcasterMiddleware(): ProducerMiddleware {
	const broadcaster = createBroadcaster({
		producers: slices,
		beforeDispatch: (player, action) => {
			if (action.arguments[0] !== player) return;
			(action.arguments as defined[]).remove(0);
			return action;
		},
		dispatch: (player, actions) => {
			Events.reflex.dispatch(player, actions);
		},
		hydrate: (player, _state) => {
			const state = store.getState().get(tostring(player.UserId));
			if (state === undefined)
				error(
					`hydration aborted: state does not contain ${player}'s data`,
				);
			Events.reflex.hydrate(player, state);
		},
	});

	Events.reflex.start.connect((player) => {
		broadcaster.start(player);
	});

	return broadcaster.middleware;
}

export const store = combineProducers({
	...slices,
})
	.enhance(addMultiplayer)
	.applyMiddleware(broadcasterMiddleware());
