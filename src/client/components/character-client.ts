import { Component, Components } from "@flamework/components";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/components/character";
import { Events } from "../networking";
import { Workspace } from "@rbxts/services";
import { CharacterStateMachine } from "./character-state-machine";
import { Inject } from "shared/inject";
import { producer } from "client/gui/producer";

const events = Events.character;

@Component()
export class CharacterClient extends Character<
	CharacterAttributes,
	CharacterInstance
> {
	@Inject
	private components!: Components;

	override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));

		const stateMachine =
			this.components.addComponent<CharacterStateMachine>(this.instance);

		this.trove.add(stateMachine);

		this.onAttributeChanged("stomach", (value) =>
			producer.setStomachAmount(value),
		);
		this.onAttributeChanged("toxicity", (value) =>
			producer.setToxicityAmount(value),
		);
		this.onAttributeChanged("temperature", (value) =>
			producer.setTemperature(value),
		);
	}

	override onHealthChanged(health: number): void {
		producer.setHealthAmount(health);
	}

	override onRemoved(): void {
		super.onRemoved();
		this.components.removeComponent<CharacterStateMachine>(this.instance);
	}

	onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.instance.Head;
	}
}
