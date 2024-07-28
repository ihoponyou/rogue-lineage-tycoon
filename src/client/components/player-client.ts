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
	private character?: CharacterClient;

	public constructor(private components: Components) {
		super();
	}

	public onLocalCharacterAdded(model: Model): void {
		this.character = this.components.addComponent<CharacterClient>(model);
	}

	public onLocalCharacterRemoving(model: Model): void {
		this.character = undefined;
		this.components.removeComponent<CharacterClient>(model);
	}

	public getCharacter(): CharacterClient {
		if (this.character === undefined) error("character unavailable");
		return this.character;
	}
}
