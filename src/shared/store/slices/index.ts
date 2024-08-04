import { conditionsSlice } from "./conditions";
import { currenciesSlice } from "./currencies";
import { identitySlice } from "./identity";
import { manaSlice } from "./mana";
import { resourcesSlice } from "./resources";
import { statsSlice } from "./stats";
import { transformSlice } from "./transform";

export = {
	conditions: conditionsSlice,
	currencies: currenciesSlice,
	identity: identitySlice,
	mana: manaSlice,
	resources: resourcesSlice,
	stats: statsSlice,
	transform: transformSlice,
};
