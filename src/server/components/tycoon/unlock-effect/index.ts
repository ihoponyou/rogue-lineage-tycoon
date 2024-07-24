import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Unlockable } from "../unlockable";

@Component()
export abstract class UnlockEffect extends BaseComponent implements OnStart {
	private unlockedConn?: RBXScriptConnection;

	public constructor(private unlockable: Unlockable) {
		super();
	}

	public onStart(): void {
		this.unlockedConn = this.unlockable.onUnlocked((unlocked) => {
			if (unlocked) this.onUnlocked();
		});
	}

	public override destroy(): void {
		this.unlockedConn?.Disconnect();
	}

	protected abstract onUnlocked(): void;
}
