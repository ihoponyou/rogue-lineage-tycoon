import { BaseComponent, Component } from "@flamework/components";

@Component()
export abstract class AbstractPlayer extends BaseComponent<{}, Player> {
	static readonly TAG = "Player";

	public readonly Name = this.instance.Name;
	public readonly UserId = this.instance.UserId;
}
