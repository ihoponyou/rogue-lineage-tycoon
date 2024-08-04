import { createBroadcaster, ProducerMiddleware } from "@rbxts/reflex";
import { Events } from "server/networking";
import slices from "shared/store/slices";

export function broadcasterMiddleware(): ProducerMiddleware {
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
	});

	Events.reflex.start.connect((player) => {
		broadcaster.start(player);
	});

	return broadcaster.middleware;
}
