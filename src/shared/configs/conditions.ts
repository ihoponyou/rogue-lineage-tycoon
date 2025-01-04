export const CONDITIONS = ["Frostbite", "BurnScar", "Concussion"] as const;
export type Condition = (typeof CONDITIONS)[number];
