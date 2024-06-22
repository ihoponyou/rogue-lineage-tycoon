import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { getCharacterFromBodyPart } from "shared/getCharacterFromBodyPart";
import { Players } from "@rbxts/services";
import { Interactable } from "..";

type TouchableInstance = BasePart | Model;

@Component()
export abstract class Touchable<
		A extends {} = {},
		I extends TouchableInstance = TouchableInstance,
	>
	extends Interactable<A, I>
	implements OnStart
{
	public abstract onStart(): void;

	protected tryInteraction(part: BasePart): void {
		if (!this.isEnabled()) return;
		const character = getCharacterFromBodyPart(part);
		if (!character) return;
		const player = Players.GetPlayerFromCharacter(character);
		if (!player) return;
		this.interact(player);
	}
}
