import { InferState, combineProducers, createProducer } from "@rbxts/reflex";
import { currenciesSlice } from "./currencies";
import { statsSlice } from "./stats";
import { manaSlice } from "./mana";
import { healthSlice } from "./health";
import { stomachSlice } from "./stomach";
import { toxicitySlice } from "./toxicity";
import { temperatureSlice } from "./temperature";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	currencies: currenciesSlice,
	stats: statsSlice,
	mana: manaSlice,
	health: healthSlice,
	stomach: stomachSlice,
	toxicity: toxicitySlice,
	temperature: temperatureSlice,
});
