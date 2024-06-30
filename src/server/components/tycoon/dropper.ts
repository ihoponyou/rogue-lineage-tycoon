import { Component, Components } from "@flamework/components";
import { Timer, TimerState } from "@rbxts/timer";
import { DisposableComponent } from "shared/components/disposable-component";
import { DROPPERS, PRODUCTS } from "server/configs/tycoon";
import { OnStart } from "@flamework/core";
import { ModelComponent } from "shared/components/model";
import { Inject } from "shared/inject";
import { Furniture, FurnitureInstance } from "./furniture";
import { Debris } from "@rbxts/services";
import { Toggleable } from "shared/components/toggleable";

type DropperInstance = FurnitureInstance & {
	Faucet: BasePart & {
		Spout: Attachment;
	};
};

@Component({
	tag: "Dropper",
})
export class Dropper
	extends DisposableComponent<{}, DropperInstance>
	implements OnStart
{
	private readonly config = DROPPERS[this.instance.Name];
	private timer = new Timer(1 / this.config.dropsPerSecond);

	@Inject
	private components!: Components;

	constructor(private toggleable: Toggleable) {
		super();
	}

	public onStart(): void {
		if (!this.config)
			error(`missing dropper config for ${this.instance.Name}`);

		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());
		this.trove.add(
			this.toggleable.onToggled((bool) => {
				print(bool, this.timer.getState());
				if (bool && this.timer.getState() === TimerState.NotRunning) {
					this.timer.start();
				} else if (
					!bool &&
					this.timer.getState() === TimerState.Running
				) {
					this.timer.stop();
				}
			}),
		);
	}

	public setDropsPerSecond(newValue: number): void {
		this.timer.setLength(1 / newValue);
	}

	private onTimerCompleted(): void {
		this.drop();
		if (this.toggleable.isEnabled()) this.timer.start();
	}

	private drop(): void {
		for (let _ = 0; _ < this.config.productsPerDrop; _++) {
			// TODO: use a part cache, maybe move to client
			const clone = this.trove.clone(this.config.productModel);
			clone.Parent = this.instance;

			this.components
				.waitForComponent<ModelComponent>(clone)
				.andThen((model) => {
					// model.setNetworkOwner(
					// 	this.plotAsset.getPlot().getOwner()?.instance,
					// );
					clone.PivotTo(this.instance.Faucet.Spout.WorldCFrame);
				});

			clone.AddTag("Model");
			clone.AddTag("Product");
			Debris.AddItem(clone);
		}
	}
}
