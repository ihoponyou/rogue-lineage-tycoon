import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { AbstractUseable } from "shared/components/abstract-useable";
import { Equippable } from "./equippable";
import { Ownable } from "./ownable";

@Component({
	tag: UseableServer.TAG,
})
export class UseableServer extends AbstractUseable implements OnStart {
	private useEventConn!: RBXScriptConnection;

	public constructor(
		protected equippable: Equippable,
		protected ownable: Ownable,
	) {
		super();
	}

	public onStart(): void {
		this.useEventConn = Events.item.use.connect((player, instance) => {
			if (instance !== this.instance) return;
			this.use(player);
		});
	}

	public override destroy(): void {
		this.useEventConn.Disconnect();
		super.destroy();
	}

	public use(player: Player): void {
		if (!(this.canUse() && this.ownable.ownedBy(player))) return;
		print("guh");
	}
}
