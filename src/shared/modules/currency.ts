import { Flamework } from "@flamework/core";

export type Currency = "Silver" | "Insight" | "Valu" | "Alignment";

export const isCurrency = Flamework.createGuard<Currency>();
