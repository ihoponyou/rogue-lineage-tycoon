import { InferState, combineProducers } from "@rbxts/reflex";
import { currenciesSlice } from "./currencies";
import { statsSlice } from "./stats";
import { manaSlice } from "./mana";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	currencies: currenciesSlice,
	stats: statsSlice,
	mana: manaSlice,
});
