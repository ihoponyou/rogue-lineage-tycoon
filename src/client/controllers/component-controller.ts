import { Controller, Dependency } from "@flamework/core";
import {
	OnLocalCharacterAdded,
	OnLocalCharacterRemoving,
} from "../../../types/lifecycles";
import { Components } from "@flamework/components";
import { CharacterClient } from "../components/character-client";
import { CharacterStateMachine } from "../components/character-state-machine";
import { Inject } from "shared/inject";

@Controller()
export class ComponentController
	implements OnLocalCharacterAdded, OnLocalCharacterRemoving
{
	@Inject
	private components!: Components;

	onLocalCharacterAdded(character: Model): void {
		this.components.addComponent<CharacterClient>(character);
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
		this.components.removeComponent<CharacterClient>(character);
	}
}
