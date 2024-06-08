import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";

interface PlotAttributes {
	id: number;
	ownerId: number;
}

@Component({
	tag: "Plot",
	defaults: {
		id: -1,
		ownerId: -1,
	},
})
export class Plot
	extends DisposableComponent<PlotAttributes, BasePart>
	implements OnStart
{
	private static totalPlots = 0;

	public onStart(): void {
		this.attributes.id = ++Plot.totalPlots;
	}

	public claim(player: Player): void {
		if (this.attributes.ownerId !== -1) return;
		this.attributes.ownerId = player.UserId;
	}
}
