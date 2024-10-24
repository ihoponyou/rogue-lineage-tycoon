import { Condition } from "shared/configs/conditions";
import {
	Currencies,
	DEFAULT_CURRENCY_STATE,
} from "shared/store/slices/currencies";
import { DEFAULT_HOTBAR_STATE, HotbarState } from "shared/store/slices/hotbar";
import { DEFAULT_IDENTITY, Identity } from "shared/store/slices/identity";
import {
	DEFAULT_INVENTORY_STATE,
	InventoryState,
} from "shared/store/slices/inventory";
import { DEFAULT_MANA_DATA, ManaData } from "shared/store/slices/mana";
import { DEFAULT_RESOURCES, Resources } from "shared/store/slices/resources";
import { DEFAULT_SKILLS_STATE, SkillsState } from "shared/store/slices/skills";
import { CharacterStats, DEFAULT_STATS } from "shared/store/slices/stats";
import {
	DEFAULT_TRANSFORM_DATA,
	TransformData,
} from "shared/store/slices/transform";

// player profile may not include all slices, so we shouldnt reuse sharedstate type
export interface PlayerProfileData {
	inventory: InventoryState;
	skills: SkillsState;
	hotbar: HotbarState;
	stats: CharacterStats;
	currencies: Currencies;
	resources: Resources;
	mana: ManaData;
	conditions: ReadonlyArray<Condition>;
	identity: Identity;
	transform: TransformData;
	classes: ReadonlyArray<string>;
}

export const DEFAULT_PLAYER_PROFILE_DATA: PlayerProfileData = {
	inventory: DEFAULT_INVENTORY_STATE,
	skills: DEFAULT_SKILLS_STATE,
	hotbar: DEFAULT_HOTBAR_STATE,
	stats: DEFAULT_STATS,
	currencies: DEFAULT_CURRENCY_STATE,
	resources: DEFAULT_RESOURCES,
	mana: DEFAULT_MANA_DATA,
	conditions: [],
	identity: DEFAULT_IDENTITY,
	transform: DEFAULT_TRANSFORM_DATA,
	classes: [],
};
