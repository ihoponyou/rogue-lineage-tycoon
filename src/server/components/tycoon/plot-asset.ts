import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import { Tech } from "shared/tech";
import { Inject } from "shared/inject";
import { ModelComponent } from "shared/components/model";
import { ASSETS } from "server/asset-config";

export interface PlotAssetAttributes {
	enabled: boolean;
	bought: boolean;
	unlocked: false;
}

export type PlotAssetInstance = Model & {
	Parent: Instance;
	Pad: Instance;
};

export type GenericPlotAsset = PlotAsset<
	PlotAssetAttributes,
	PlotAssetInstance
>;

@Component({
	defaults: {
		enabled: false,
		bought: false,
		unlocked: false,
	},
})
export abstract class PlotAsset<
		A extends PlotAssetAttributes,
		I extends PlotAssetInstance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected readonly config = ASSETS[this.instance.Name];
	protected plot!: Plot;
	protected pad!: ClickInteractable;

	@Inject
	protected components!: Components;
	@Inject
	protected model!: ModelComponent;

	constructor(private currencyService: CurrencyService) {
		super();
		if (!this.config) error(`asset "${this.instance.Name}" does not exist`);
	}

	public onStart(): void {
		const plot = this.components.getComponent<Plot>(this.instance.Parent);
		if (!plot) error("parent is not a Plot or is missing Plot component");
		this.plot = plot;

		this.pad = this.trove.add(
			this.components.addComponent<ClickInteractable>(this.instance.Pad),
		);
		this.pad.onInteracted((player) => this.buy(player));

		this.plot.addAsset(this);

		this.onAttributeChanged("enabled", (newValue) =>
			newValue ? this.onEnabled() : this.onDisabled(),
		);
		this.attributes.enabled ? this.onEnabled() : this.onDisabled();

		this.model.hide();
	}

	protected onEnabled(): void {}

	protected onDisabled(): void {}

	public buy(player: Player): void {
		if (this.attributes.bought) return;
		const owner = this.plot.getOwner();
		if (player !== owner?.instance) return;

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

		this.attributes.enabled = true;

		this.pad.instance.Destroy();
		this.model.show();

		print(`${player.Name} bought ${this.instance}`);
	}

	public getPad(): ClickInteractable {
		return this.pad;
	}
}
