import { Component, Components } from "@flamework/components";
import { Workspace } from "@rbxts/services";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/components/character";
import { Inject } from "shared/inject";
import { Events } from "../networking";
import { CharacterStateMachine } from "./character-state-machine";

const events = Events.character;

@Component()
export class CharacterClient extends Character<
	CharacterAttributes,
	CharacterInstance
> {
	@Inject
	private components!: Components;

	public override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));

		const stateMachine =
			this.components.addComponent<CharacterStateMachine>(this.instance);

		this.trove.add(stateMachine);
	}

	protected override onHealthChanged(health: number): void {
		// producer.setHealthAmount(health);
	}

	public override destroy(): void {
		this.components.removeComponent<CharacterStateMachine>(this.instance);
		super.destroy();
	}

	private onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.instance.Head;
	}
}
