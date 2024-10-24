import { Components } from "@flamework/components";
import { Modding } from "@flamework/core";
import { createContext } from "@rbxts/react";
import { CharacterController } from "client/controllers/character-controller";

export const singletonsContext = createContext({
	character: Modding.resolveSingleton(CharacterController),
	components: Modding.resolveSingleton(Components),
});
