import { Component } from "@flamework/components";
import { DisposableComponent } from "./disposable-component";

@Component()
export abstract class AbstractPlayer extends DisposableComponent<{}, Player> {
	static readonly TAG = "Player";

	public readonly Name = this.instance.Name;
	public readonly UserId = this.instance.UserId;
}
