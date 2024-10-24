import { ProducerMiddleware, createBroadcastReceiver } from "@rbxts/reflex";
import { Events } from "client/network";

export function receiverMiddleware(): ProducerMiddleware {
	const receiver = createBroadcastReceiver({
		start: () => {
			Events.reflex.start();
		},
	});

	Events.reflex.dispatch.connect((actions) => {
		receiver.dispatch(actions);
	});

	Events.reflex.hydrate.connect((state) => {
		receiver.hydrate(state);
	});

	return receiver.middleware;
}
