import { combineProducers } from "@rbxts/reflex";
import { conditionsSlice } from "./slices/conditions";
import { currenciesSlice } from "./slices/currencies";
import { identitySlice } from "./slices/identity";
import { manaSlice } from "./slices/mana";
import { resourcesSlice } from "./slices/resources";
import { statsSlice } from "./slices/stats";

export const playersSlice = combineProducers({
	stats: statsSlice,
	currencies: currenciesSlice,
	resources: resourcesSlice,
	mana: manaSlice,
	conditions: conditionsSlice,
	identity: identitySlice,
});
