import { Component } from "@flamework/components";
import {
	Character,
	CharacterAttributes,
	CharacterInstance,
} from "shared/modules/components/character";
import { Events } from "../networking";
import { Workspace } from "@rbxts/services";
import { HudController } from "../controllers/hud-controller";

const events = Events.characterEvents;

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
		print("health", health);
		this.hudController.updateHealth(
			health,
			this.instance.Humanoid.MaxHealth,
		);
	}

	onKilled(): void {
		print("refocusing camera");
		const camera = Workspace.CurrentCamera;
		if (!camera) return;
		camera.CameraSubject = this.instance.Head;
	}
}
