import { Flamework } from "@flamework/core";
import Object from "@rbxts/object-utils";

export const CLASSES = {
	"Pit Fighter": {},
	Warrior: {},
	Thief: {},
};

export type ClassId = keyof typeof CLASSES;
export const CLASS_IDS = Object.keys(CLASSES) as ClassId[];
export const isClassId = Flamework.createGuard<ClassId>();
