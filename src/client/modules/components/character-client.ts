import { Component } from "@flamework/components";
import { Character, CharacterInstance } from "shared/modules/components/character";

@Component({
	tag: "Character"
})
export class CharacterClient extends Character<{}, CharacterInstance> {
	protected onHealthChanged(health: number): void {
		// change health bar
	}
}