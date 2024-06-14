import { Component, Components } from "@flamework/components";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/components/character";
import { Events } from "../networking";
import { CollectionService, Workspace } from "@rbxts/services";
import { HudController } from "../controllers/hud-controller";
import { Dependency } from "@flamework/core";
import { CharacterStateMachine } from "./character-state-machine";
import { Inject } from "shared/inject";

const events = Events.character;

@Component()
export class CharacterClient extends Character<
	CharacterAttributes,
	CharacterInstance
> {
	@Inject
	private components!: Components;

	constructor(private hudController: HudController) {
		super();
	}

	override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));

		const stateMachine =
			this.components.addComponent<CharacterStateMachine>(this.instance);

		this.trove.add(stateMachine);
	}

	override onHealthChanged(health: number): void {
		this.hudController.updateHealth(
			health,
			this.instance.Humanoid.MaxHealth,
		);
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
