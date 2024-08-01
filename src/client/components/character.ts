import { Component } from "@flamework/components";
import { Workspace } from "@rbxts/services";
import { SharedComponents } from "shared/components/character";
import { Events } from "../networking";

@Component({
	defaults: {
		isKnocked: false,
		isAlive: true,
	},
})
export class Character extends SharedComponents.Character {
	public override onStart(): void {
		super.onStart();

		this.instance.AddTag("CharacterStateMachine");

		this.trove.add(Events.character.killed.connect(() => this.onKilled()));
	}

	private onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.getHead();
	}
}
