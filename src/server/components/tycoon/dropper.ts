import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Timer } from "@rbxts/timer";
import { DisposableComponent } from "shared/components/disposable-component";
import { t } from "@rbxts/t";

interface DropperAttributes {
	rate: number;
}

type DropperInstance = Instance & {
	Spout: Attachment;
};

@Component({
	tag: "Dropper",
	attributes: {
		rate: t.numberPositive,
	},
	defaults: {
		rate: 1,
	},
})
export class Dropper
	extends DisposableComponent<DropperAttributes, DropperInstance>
	implements OnStart
{
	private timer = new Timer(this.attributes.rate);
	private product?: Instance;

	public onStart(): void {
		this.onAttributeChanged("rate", (newValue) =>
			this.timer.setLength(newValue),
		);
		this.trove.connect(this.timer.completed, () => this.timer.start());

		this.timer.start();
	}
}
