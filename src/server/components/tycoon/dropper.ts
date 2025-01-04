import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Debris } from "@rbxts/services";
import { Timer, TimerState } from "@rbxts/timer";
import { Trove } from "@rbxts/trove";
import { DROPPERS } from "server/configs/tycoon";
import { Toggleable } from "shared/components/toggleable";
import { UsefulModel } from "shared/components/useful-model";

type DropperInstance = Model & {
	Faucet: BasePart & {
		Spout: Attachment;
	};
};

@Component({
	tag: "Dropper",
})
export class Dropper
	extends BaseComponent<{}, DropperInstance>
	implements OnStart
{
	private readonly config = DROPPERS[this.instance.Name];
	private timer!: Timer;
	private trove = new Trove();

	constructor(
		private components: Components,
		private toggleable: Toggleable,
	) {
		super();
		if (!this.config)
			error(`dropper "${this.instance.Name}" does not exist`);
		this.timer = new Timer(1 / this.config.dropsPerSecond);
	}

	override destroy(): void {
		this.trove.clean();
		super.destroy();
	}

	onStart(): void {
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

	setDropsPerSecond(newValue: number): void {
		this.timer.setLength(1 / newValue);
	}

	onTimerCompleted(): void {
		this.drop();
		if (this.toggleable.isEnabled()) this.timer.start();
	}

	getRandomProduct(): Model {
		return this.config.productModels[
			math.random(0, this.config.productModels.size() - 1)
		];
	}

	drop(): void {
		for (let _ = 0; _ < this.config.productsPerDrop; _++) {
			// TODO: use a part cache, maybe move to client
			const clone = this.trove.clone(this.getRandomProduct());
			clone.Parent = this.instance;

			this.components
				.waitForComponent<UsefulModel>(clone)
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
