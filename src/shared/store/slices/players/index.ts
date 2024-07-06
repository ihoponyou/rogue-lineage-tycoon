import { combineProducers } from "@rbxts/reflex";
import { currencySlice } from "./currency";
import { statsSlice } from "./stats";

export const playersSlice = combineProducers({
	stats: statsSlice,
	currency: currencySlice,
});
