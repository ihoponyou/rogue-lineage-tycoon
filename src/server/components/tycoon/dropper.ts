import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Debris } from "@rbxts/services";
import { Timer, TimerState } from "@rbxts/timer";
import { DROPPERS } from "server/configs/tycoon";
import { DisposableComponent } from "shared/components/disposable-component";
import { ModelComponent } from "shared/components/model";
import { Toggleable } from "shared/components/toggleable";
import { Inject } from "shared/inject";

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
	implements OnStart
{
	private readonly config = DROPPERS[this.instance.Name];
	private timer!: Timer;

	@Inject
	private components!: Components;

	public constructor(private toggleable: Toggleable) {
		super();
		if (!this.config)
			error(`dropper "${this.instance.Name}" does not exist`);
		this.timer = new Timer(1 / this.config.dropsPerSecond);
	}

	public onStart(): void {
		this.trove.connect(this.timer.completed, () => this.onTimerCompleted());
		this.trove.add(
			this.toggleable.onToggled((bool) => {
				// print(bool, this.timer.getState());
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

	private getRandomProduct(): Model {
		return this.config.productModels[
			math.random(0, this.config.productModels.size() - 1)
		];
	}

	private drop(): void {
		for (let _ = 0; _ < this.config.productsPerDrop; _++) {
			// TODO: use a part cache, maybe move to client
			const clone = this.trove.clone(this.getRandomProduct());
			clone.Parent = this.instance;

			this.components
				.waitForComponent<ModelComponent>(clone)
				.andThen((_model) => {
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
