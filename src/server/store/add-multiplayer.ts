/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InferActions, InferState, Producer } from "@rbxts/reflex";
import { createProducer } from "@rbxts/reflex";
import { Dictionary as Object } from "@rbxts/sift";

// credit to sasial

type ReplaceStateParameters<State, Actions> = {
	readonly [K in keyof Actions]: Actions[K] extends (
		state: any,
		...args: infer Args
	) => any
		? (state: State, player: Player, ...args: Args) => State
		: never;
};

export function addMultiplayer<
	P extends Producer,
	S = InferState<P>,
	A = ReplaceStateParameters<Map<string, S>, InferActions<P>>,
>(producer: P): Producer<Map<string, S>, A> {
	const actions = Object.map(
		producer.getActions() as Record<
			string,
			(state: S, ...args: unknown[]) => S
		>,
		(action) => {
			return (
				combinedState: Map<string, S>,
				player: Player,
				...args: unknown[]
			) => {
				const nextState = table.clone(combinedState);

				const id = tostring(player.UserId);
				if (!nextState.has(id)) {
					nextState.set(id, producer.getState());
				}

				const producerState = nextState.get(id)!;
				nextState.set(id, action(producerState, ...args));

				return nextState;
			};
		},
	) as never;

	return createProducer(new Map(), actions);
}
