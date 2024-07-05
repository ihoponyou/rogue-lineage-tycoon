import { Component } from "@flamework/components";
import { DisposableComponent } from "./disposable-component";

interface PlayerAttributes {
	days: number;
	lives: number;
}

@Component()
export abstract class AbstractPlayer extends DisposableComponent<
	PlayerAttributes,
	Player
> {
	public readonly Name = this.instance.Name;
	public readonly UserId = this.instance.UserId;
}
