import { CombineStates } from "@rbxts/reflex";
import slices from "./slices";

export type SharedState = CombineStates<typeof slices>;
