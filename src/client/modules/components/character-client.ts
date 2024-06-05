import { Component } from "@flamework/components";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/modules/components/character";
import { Events } from "../networking";
import { Workspace } from "@rbxts/services";
import { HudController } from "../controllers/hud-controller";

const events = Events.character;

@Component({
	tag: "Character",
})
export class CharacterClient extends Character<
	CharacterAttributes,
	CharacterInstance
> {
	constructor(private hudController: HudController) {
		super();
	}

	override onStart(): void {
		super.onStart();

		this.trove.add(events.killed.connect(() => this.onKilled()));
	}

	override onHealthChanged(health: number): void {
		this.hudController.updateHealth(
			health,
			this.instance.Humanoid.MaxHealth,
		);
	}

	onKilled(): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.instance.Head;
	}
}
