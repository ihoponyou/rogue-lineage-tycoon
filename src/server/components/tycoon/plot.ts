import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { GenericPlotAsset } from "./plot-asset";
import { ClickInteractable } from "../interactable/click-interactable";

interface PlotAttributes {
	id: number;
}

@Component({
	tag: "Plot",
	defaults: {
		id: -1,
	},
})
export class Plot
	extends DisposableComponent<PlotAttributes, BasePart>
	implements OnStart
{
	private static totalPlots = 0;

	private owner?: Player;
	public assets = new Map<ClickInteractable, GenericPlotAsset>();

	public onStart(): void {
		this.attributes.id = ++Plot.totalPlots;
	}

	public claim(player: Player): void {
		if (this.owner !== undefined) return;
		if (player === this.owner) return;
		this.owner = player;
		print(`${player.Name} claimed T${this.attributes.id}`);
	}

	public getOwner(): Player | undefined {
		return this.owner;
	}

	public addAsset(asset: GenericPlotAsset): void {
		try {
			this.assets.set(asset.getPad(), asset);
			// print(this.assets);
		} catch (err: unknown) {
			warn(err + "; Pad may be missing CollectionService tag");
		}
	}
}
