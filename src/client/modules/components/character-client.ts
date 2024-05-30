import { Component } from "@flamework/components";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/modules/components/character";
import { Events } from "../networking";
import { Workspace } from "@rbxts/services";

const events = Events.characterEvents;

@Component({
	tag: "Character",
})
export class CharacterClient extends Character<
	CharacterAttributes,
	CharacterInstance
> {
	override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));
	}

	protected onHealthChanged(health: number): void {
		// change health bar
	}

	onKilled(): void {
		print("refocusing camera");
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.instance.Head;
	}
}
