import { BaseComponent, Component } from "@flamework/components";
import { PlayerServer } from "./player-server";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent {
	public static TAG = "Ownable";

	private owner?: PlayerServer;

	public setOwner(player: PlayerServer): void {
		this.owner =
	}
}
