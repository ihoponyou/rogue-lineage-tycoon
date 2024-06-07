import { Controller, Dependency } from "@flamework/core";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "../../../../types/lifecycles";
import { Components } from "@flamework/components";
import { CharacterClient } from "../components/character-client";
import { CharacterStateMachine } from "../components/character-state-machine";

@Controller()
export class ComponentController
	implements OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	onLocalCharacterAdded(character: Model): void {
		const components = Dependency<Components>();
		components.addComponent<CharacterClient>(character);
		// components
		// 	.waitForComponent<CharacterClient>(character)
		// 	.andThen(
		// 		() =>
		// 			(this.characterStateMachine =
		// 				components.addComponent<CharacterStateMachine>(
		// 					character,
		// 				)),
		// 	);
	}

	onLocalCharacterRemoving(character: Model): void {
		const components = Dependency<Components>();
		components.removeComponent<CharacterClient>(character);
	}
}
