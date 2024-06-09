import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { GenericPlotAsset } from "./plot-asset";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";

interface PlotAttributes {
	id: number;
}

type PlotInstance = BasePart & {
	Teller: Teller;
};

@Component({
	tag: "Plot",
	defaults: {
		id: -1,
	},
})
export class Plot
	extends DisposableComponent<PlotAttributes, PlotInstance>
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
	private teller!: ClickInteractable;

	constructor(private currencyService: CurrencyService) {
		super();
	}

	public onStart(): void {
		this.attributes.id = ++Plot.totalPlots;

		const components = Dependency<Components>();
		this.teller = components.addComponent<ClickInteractable>(
			this.instance.Teller,
		);
		this.teller.onInteracted((player) => {
			if (player !== this.owner) return;
			this.currencyService.addCurrency(
				this.owner,
				"Silver",
				this.bank.Silver,
			);
			this.bank.Silver = 0;
			this.instance.Teller.SurfaceGui.TextLabel.Text = `0`;
		});
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
		this.instance.Teller.SurfaceGui.TextLabel.Text = `${this.bank[currency]}`;
	}
}
