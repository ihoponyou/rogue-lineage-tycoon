import { combineProducers } from "@rbxts/reflex";
import { conditionsSlice } from "./conditions";
import { currenciesSlice } from "./currencies";
import { identitySlice } from "./identity";
import { manaSlice } from "./mana";
import { resourcesSlice } from "./resources";
import { statsSlice } from "./stats";

export const playersSlice = combineProducers({
	stats: statsSlice,
	currencies: currenciesSlice,
	resources: resourcesSlice,
	mana: manaSlice,
	conditions: conditionsSlice,
	identity: identitySlice,
});
