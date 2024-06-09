import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import Signal from "@rbxts/signal";

export interface PlotAssetAttributes {
	enabled: boolean;
	bought: boolean;
	unlocked: boolean;
	cost: number;
	currency: Currency;
}

export type PlotAssetInstance = BasePart & {
	Parent: Instance;
	Pad: Instance;
};

export type GenericPlotAsset = PlotAsset<
	PlotAssetAttributes,
	PlotAssetInstance
>;

@Component({
	attributes: {
		cost: t.numberPositive,
	},
})
export abstract class PlotAsset<
		A extends PlotAssetAttributes,
		I extends PlotAssetInstance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected plot!: Plot;
	protected pad!: ClickInteractable;

	private originalTransparency = 0;

	constructor(private currencyService: CurrencyService) {
		super();
	}

	public onStart(): void {
		const components = Dependency<Components>();
		const plot = components.getComponent<Plot>(this.instance.Parent);
		if (!plot) error("parent is not a Plot or is missing Plot component");
		this.plot = plot;
		this.pad = this.trove.add(
			components.addComponent<ClickInteractable>(this.instance.Pad),
		);

		this.pad.onInteracted((player) => this.purchase(player));

		this.plot.addAsset(this);

		this.originalTransparency = this.instance.Transparency;
		this.hide();

		this.onAttributeChanged("bought", (newValue) =>
			newValue ? this.onBought() : this.onRefund(),
		);
		this.attributes.bought ? this.onBought() : this.onRefund();
	}

	protected show(): void {
		this.instance.Transparency = this.originalTransparency;
	}

	protected hide(): void {
		this.instance.Transparency = 1;
	}

	protected onBought(): void {
		this.attributes.enabled = true;

		this.pad.instance.Destroy();
		this.show();
	}

	protected onRefund(): void {}

	public purchase(player: Player): void {
		if (player !== this.plot.getOwner()) return;
		if (!this.attributes.unlocked) return;
		if (this.attributes.bought) return;
		const ownerCurrencyAmount = this.currencyService.getCurrencyData(
			player,
			this.attributes.currency,
		).Amount;
		if (ownerCurrencyAmount < this.attributes.cost) return;

		this.currencyService.subtractCurrency(
			player,
			this.attributes.currency,
			this.attributes.cost,
		);

		this.attributes.bought = true;

		print(`${player.Name} bought ${this.instance}`);
	}

	public getPad(): ClickInteractable {
		return this.pad;
	}
}
