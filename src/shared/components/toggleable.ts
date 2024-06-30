import { BaseComponent, Component } from "@flamework/components";
import Signal from "@rbxts/signal";

type ToggledCallback = (bool: boolean) => void;

@Component({
	tag: "Toggleable",
})
export class Toggleable extends BaseComponent {
	private _isEnabled = false;
	private toggled = new Signal<ToggledCallback>();

	public onToggled(callback: ToggledCallback): RBXScriptConnection {
		return this.toggled.Connect((bool) => callback(bool));
	}

	public toggle(isEnabled: boolean): void {
		this._isEnabled = isEnabled;
		this.toggled.Fire(isEnabled);
	}

	public isEnabled(): boolean {
		return this._isEnabled;
	}
}
