import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ModelComponent } from "shared/components/model";
import { Plot } from "./plot";
import { Toggleable } from "shared/toggleable";
import { DisposableComponent } from "shared/components/disposable-component";
import { Hideable } from "shared/hideable";

export type FurnitureInstance = Model & {
	Parent: Model;
};

@Component({
	tag: "Furniture",
})
export abstract class Furniture<
		A extends {} = {},
		I extends FurnitureInstance = FurnitureInstance,
	>
	extends DisposableComponent<A, I>
	implements Hideable
{
	protected _isEnabled = false;
	private plot!: Plot;

	constructor(
		protected model: ModelComponent,
		protected components: Components,
	) {
		super();

		components
			.waitForComponent<Plot>(this.instance.Parent)
			.andThen((plot) => (this.plot = plot));

		this.hide();
	}

	public isEnabled(): boolean {
		return this._isEnabled;
	}

	public show(): void {
		this.model.show();
	}

	public hide(): void {
		this.model.hide();
	}
}
