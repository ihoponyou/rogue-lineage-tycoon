import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { GenericPlotAsset } from "./plot-asset";
import { ClickInteractable } from "../interactable/click-interactable";
import { Currency } from "./product";

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
	public assets = new Map<ClickInteractable, GenericPlotAsset>();

	private static totalPlots = 0;

	private owner?: Player;
	private bank: { [currency in Currency]: number } = {
		Silver: 0,
		Insight: 0,
		Valu: 0,
		Alignment: 0,
	};

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

	public deposit(currency: Currency, value: number): void {
		this.bank[currency] += value;
		print(this.bank);
	}
}
