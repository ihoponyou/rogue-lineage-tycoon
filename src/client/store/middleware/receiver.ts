import { ProducerMiddleware, createBroadcastReceiver } from "@rbxts/reflex";
import { Events } from "client/networking";

export function receiverMiddleware(): ProducerMiddleware {
	const receiver = createBroadcastReceiver({
		start: () => {
			Events.reflex.start();
		},
	});

	Events.reflex.dispatch.connect((actions) => {
		receiver.dispatch(actions);
	});

	return receiver.middleware;
}
