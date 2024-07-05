import { InferState, combineProducers } from "@rbxts/reflex";
import { currenciesSlice } from "./currencies";
import { healthSlice } from "./health";
import { manaSlice } from "./mana";
import { statsSlice } from "./stats";
import { stomachSlice } from "./stomach";
import { temperatureSlice } from "./temperature";
import { toxicitySlice } from "./toxicity";

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

export function selectLives(state: RootState) {
	return state.stats.lives;
}

export function selectDays(state: RootState) {
	return state.stats.days;
}
