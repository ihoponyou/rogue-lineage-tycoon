import { Component, Components } from "@flamework/components";

import { AbstractPlayer } from "shared/components/abstract-player";
import { OnLocalCharacterAdded } from "../../../types/lifecycles";
import { Character } from "./character";

@Component({
	tag: "Player",
})
export class PlayerClient
	extends AbstractPlayer
	implements OnLocalCharacterAdded
{
	private character?: Character;

	public constructor(private components: Components) {
		super();
	}

	public onLocalCharacterAdded(model: Model): void {
		this.character = this.components.addComponent<Character>(model);
	}

	public onLocalCharacterRemoving(model: Model): void {
		this.character = undefined;
		this.components.removeComponent<Character>(model);
	}

	public getCharacter(): Character {
		if (this.character === undefined) error("character unavailable");
		return this.character;
	}
}
