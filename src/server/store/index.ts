import {
	combineProducers,
	createBroadcaster,
	InferState,
	ProducerMiddleware,
} from "@rbxts/reflex";
import { Events } from "server/network";
import { withMultiplayer } from "server/store/with-multiplayer";
import { DEFAULT_PLAYER_PROFILE_DATA } from "shared/modules/player-data";
import slices from "shared/store/slices";
import { selectPlayer } from "./selectors";

const SECONDS_BETWEEN_HYDRATES = 60 * 5;

function broadcasterMiddleware(): ProducerMiddleware {
	const broadcaster = createBroadcaster({
		producers: {
			...slices,
		},
		beforeDispatch: (player, action) => {
			if (action.name === "removePlayer") return;
			if (action.arguments[0] !== player) return;
			(action.arguments as defined[]).shift();
			return action;
		},
		dispatch: (player, actions) => {
			Events.reflex.dispatch(player, actions);
		},
		hydrate: (player, _state) => {
			const playerState = store.getState(selectPlayer(player));
			Events.reflex.hydrate(
				player,
				playerState ?? DEFAULT_PLAYER_PROFILE_DATA,
			);
		},
		hydrateRate: SECONDS_BETWEEN_HYDRATES,
	});

	Events.reflex.start.connect((player) => {
		broadcaster.start(player);
	});

	return broadcaster.middleware;
}

export const store = combineProducers({
	...slices,
})
	.enhance(withMultiplayer)
	.applyMiddleware(broadcasterMiddleware());

export type RootServerState = InferState<typeof store>;
