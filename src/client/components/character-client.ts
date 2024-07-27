import { Component, Components } from "@flamework/components";
import { Workspace } from "@rbxts/services";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Inject } from "shared/inject";
import { Events } from "../networking";
import { CharacterStateMachine } from "./character-state-machine";

const events = Events.character;

@Component({
	defaults: {
		isKnocked: false,
		isAlive: true,
	},
})
export class CharacterClient extends AbstractCharacter {
	@Inject
	private components!: Components;

	public override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));

		const stateMachine =
			this.components.addComponent<CharacterStateMachine>(this.instance);

		this.trove.add(stateMachine);
	}

	public override destroy(): void {
		this.components.removeComponent<CharacterStateMachine>(this.instance);
		super.destroy();
	}

	private onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.getHead();
	}
}
