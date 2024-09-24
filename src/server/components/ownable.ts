import { BaseComponent, Component } from "@flamework/components";
import { PlayerServer } from "./player-server";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent {
	public static TAG = "Ownable";

	private owner?: PlayerServer;

	public setOwner(player?: PlayerServer): void {
		this.owner = player;
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public hasOwner(): boolean {
		return this.owner !== undefined;
	}

	public ownedBy(player: Player): boolean {
		if (!this.hasOwner()) return false;
		return this.owner!.instance === player;
	}
}
