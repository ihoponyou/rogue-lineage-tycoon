import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";

@Component({
	tag: "Unlockable",
})
export class Unlockable<
	A extends {} = {},
	I extends Instance = Instance,
> extends BaseComponent<A, I> {
	private _isUnlocked = false;
	private unlocked = new Signal<(unlocked: boolean) => void>();

	public unlock(): void {
		if (this._isUnlocked) {
			warn("already unlocked");
			return;
		}
		this.unlocked.Fire(true);
	}

	public onUnlocked(
		callback: (unlocked: boolean) => void,
	): RBXScriptConnection {
		return this.unlocked.Connect(callback);
	}
}
