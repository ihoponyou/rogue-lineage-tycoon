import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Inject } from "shared/inject";
import { ModelComponent } from "shared/components/model";
import { ASSETS } from "server/configs/tycoon";
import { Hideable } from "shared/hideable";
import { PlayerServer } from "../player-server";
import { Toggleable } from "shared/toggleable";

export interface PlotAssetAttributes {
	enabled: boolean;
	bought: boolean;
	unlocked: boolean;
}

export type PlotAssetInstance = Model & {
	Parent: Model;
};

@Component({
	tag: "PlotAsset",
	defaults: {
		enabled: false,
		bought: false,
		unlocked: false,
	},
})
export class PlotAsset
	extends DisposableComponent<PlotAssetAttributes, PlotAssetInstance>
	implements OnStart, Hideable
{
	protected readonly config = ASSETS[this.instance.Name];
	protected plot!: Plot;

	@Inject
	protected components!: Components;

	constructor(
		private currencyService: CurrencyService,
		private model: ModelComponent,
	) {
		super();
		if (!this.config)
			error(`config for asset "${this.instance.Name}" does not exist`);
	}

	public onStart(): void {
		const plot = this.components.getComponent<Plot>(this.instance.Parent);
		if (!plot) error("parent is not a Plot or is missing Plot component");
		this.plot = plot;
	}

	public show(): void {
		this.model.show();
	}

	public hide(): void {
		this.model.hide();
	}

	public buy(player: Player): void {
		if (this.attributes.bought) return;
		const owner = this.plot.getOwner();
		if (!owner) return;
		if (player !== owner.instance) return;
		if (!this.hasPrerequisites(owner)) return;

		const ownerCurrencyAmount = this.currencyService.getCurrencyData(
			player,
			this.config.currency,
		).Amount;
		if (ownerCurrencyAmount < this.config.cost) return;

		this.currencyService.subtractCurrency(
			player,
			this.config.currency,
			this.config.cost,
		);

		owner.addAsset(this.instance.Name);

		this.attributes.enabled = true;
		this.attributes.bought = true;
		this.model.show();

		this.plot.refreshPads();

		print(`${player.Name} bought ${this.instance}`);
	}

	public hasPrerequisites(player: PlayerServer): boolean {
		for (const assetName of this.config.prerequisites) {
			if (!player.hasAsset(assetName)) return false;
		}
		return true;
	}

	public getPlot(): Plot {
		return this.plot;
	}
}
