import { Flamework } from "@flamework/core";
import Object from "@rbxts/object-utils";

const _ = {
	Silver: 0,
	Valu: 0,
	Insight: 0,
	Alignment: 0,
};

export type Currency = keyof typeof _;
export const CURRENCIES = Object.keys(_) as Currency[];

export const isCurrency = Flamework.createGuard<Currency>();
