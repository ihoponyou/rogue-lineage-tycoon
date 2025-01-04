import { classesSlice } from "./classes";
import { conditionsSlice } from "./conditions";
import { currenciesSlice } from "./currencies";
import { hotbarSlice } from "./hotbar";
import { identitySlice } from "./identity";
import { inventorySlice } from "./inventory";
import { manaSlice } from "./mana";
import { resourcesSlice } from "./resources";
import { skillsSlice } from "./skills";
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
	inventory: inventorySlice,
	skills: skillsSlice,
	classes: classesSlice,
	hotbar: hotbarSlice,
};
