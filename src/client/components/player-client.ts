import { Component, Components } from "@flamework/components";

import { AbstractPlayer } from "shared/components/abstract-player";
import { OnLocalCharacterAdded } from "../../../types/lifecycles";
import { CharacterClient } from "./character-client";

@Component({
	tag: "Player",
})
export class PlayerClient
	extends AbstractPlayer
	implements OnLocalCharacterAdded
{
	public constructor(private components: Components) {
		super();
	}

	public onLocalCharacterAdded(character: Model): void {
		this.components.addComponent<CharacterClient>(character);
	}

	public onLocalCharacterRemoving(character: Model): void {
		this.components.removeComponent<CharacterClient>(character);
	}
}
