import { Component, Components } from "@flamework/components";
import { Timer, TimerState } from "@rbxts/timer";
import { DisposableComponent } from "shared/components/disposable-component";
import { Toggleable } from "shared/toggleable";
import { DROPPERS, PRODUCTS } from "server/tycoon-config";
import { PlotAsset } from "./plot-asset";
import { OnStart } from "@flamework/core";
import { ModelComponent } from "shared/components/model";
import { Product } from "./product";

type DropperInstance = Model & {
	Faucet: BasePart & {
		Spout: Attachment;
	};
};

@Component({
	tag: "Dropper",
})
export class Dropper
	extends DisposableComponent<{}, DropperInstance>
	implements OnStart, Toggleable
{
	private readonly config = DROPPERS[this.instance.Name];
	private _isEnabled = false;
	private timer = new Timer(1 / this.config.dropsPerSecond);

	constructor(
		private plotAsset: PlotAsset,
		private components: Components,
	) {
		super();
	}

	public onStart(): void {
		if (!this.config)
			error(`missing dropper config for ${this.instance.Name}`);

		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());

		this.trove.add(
			this.plotAsset.onAttributeChanged("enabled", (newValue) =>
				newValue ? this.enable() : this.disable(),
			),
		);
		this.plotAsset.attributes.enabled ? this.enable() : this.disable();
	}

	public setDropsPerSecond(newValue: number): void {
		this.timer.setLength(1 / newValue);
	}

	public enable(): void {
		this._isEnabled = true;
		if (this.timer.getState() !== TimerState.Running) this.timer.start();
	}

	public disable(): void {
		this._isEnabled = false;
		if (this.timer.getState() === TimerState.Running) this.timer.stop();
	}

	public isEnabled(): boolean {
		return this._isEnabled;
	}

	private onTimerCompleted(): void {
		this.drop();
		if (this.plotAsset.attributes.enabled) this.timer.start();
	}

	private drop(): void {
		for (let _ = 0; _ < this.config.productsPerDrop; _++) {
			// TODO: use a part cache, maybe move to client
			const clone = this.trove.clone(this.config.productModel);
			clone.Parent = this.instance;

			this.components
				.waitForComponent<ModelComponent>(clone)
				.andThen((model) => {
					model.setNetworkOwner(
						this.plotAsset.getPlot().getOwner()?.instance,
					);
					clone.PivotTo(this.instance.Faucet.Spout.WorldCFrame);
				});

			clone.AddTag("Model");
			clone.AddTag("Product");
		}
	}
}
