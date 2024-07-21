import { Component } from "@flamework/components";
import { Players } from "@rbxts/services";
import { getCharacterFromBodyPart } from "shared/getCharacterFromBodyPart";
import { Interactable } from "..";

type TouchableInstance = BasePart | Model;

@Component()
export abstract class Touchable<
	A extends {} = {},
	I extends TouchableInstance = TouchableInstance,
> extends Interactable<A, I> {
	protected tryInteraction(part: BasePart): void {
		if (!this.isEnabled()) return;
		const character = getCharacterFromBodyPart(part);
		if (!character) return;
		const player = Players.GetPlayerFromCharacter(character);
		if (!player) return;
		if (!this.isPlayerAllowed(player)) return;
		this.interact(player);
	}
}
