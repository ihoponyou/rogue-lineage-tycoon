export const CONDITIONS = ["Frostbite", "BurnScar"] as const;
export type Condition = (typeof CONDITIONS)[number];
