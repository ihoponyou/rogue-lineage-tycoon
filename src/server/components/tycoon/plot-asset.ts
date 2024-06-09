import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";

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

		this.pad.onInteracted((player) => {
			if (player !== plot.getOwner()) return;
			this.purchase();
		});

		this.plot.addAsset(this);
	}

	public purchase() {
		if (!this.attributes.unlocked) return;
		if (this.attributes.bought) return;
		const owner = this.plot.getOwner()!;
		const ownerCurrencyAmount = this.currencyService.getCurrencyData(
			owner,
			this.attributes.currency,
		).Amount;
		if (ownerCurrencyAmount < this.attributes.cost) return;

		this.currencyService.subtractCurrency(
			owner,
			this.attributes.currency,
			this.attributes.cost,
		);

		this.attributes.enabled = true;
		this.attributes.bought = true;

		print(`${owner.Name} bought ${this.instance}`);
	}

	public getPad(): ClickInteractable {
		return this.pad;
	}
}
