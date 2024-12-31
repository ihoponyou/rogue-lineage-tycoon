import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Events } from "server/network";
import { CharacterServer } from "./character-server";

@Component({
	tag: "Poison",
})
export class Poison
	extends BaseComponent<{}, Model>
	implements OnStart, OnTick
{
	constructor(private character: CharacterServer) {
		super();
	}

	onStart(): void {
		Events.playEffect.broadcast("Poison", this.instance);
		// automatically remove debuff after 15 seconds
		task.delay(15, () => this.instance.RemoveTag("Poison"));
	}

	onTick(dt: number): void {
		// deal 5% max hp as damage per second
		this.character.takeDamage(
			this.character.getHumanoid().MaxHealth * 0.05 * dt,
		);
	}

	override destroy(): void {
		Events.playEffect.broadcast("StopPoison", this.instance);
		super.destroy();
	}
}
