import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";

type UnlockedCallback = (unlockedBy: Player, unlocked: boolean) => void;

@Component({
	tag: "Unlockable",
})
export class Unlockable<
	A extends {} = {},
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	private _isUnlocked = false;
	private unlocked = new Signal<UnlockedCallback>();

	public unlock(player: Player): void {
		if (this._isUnlocked) {
			warn("already unlocked");
			return;
		}
		this.unlocked.Fire(player, true);
	}

	public onUnlocked(callback: UnlockedCallback): RBXScriptConnection {
		return this.unlocked.Connect(callback);
	}
}
