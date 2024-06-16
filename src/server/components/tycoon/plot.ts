import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { GenericPlotAsset } from "./plot-asset";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import { PlayerServer } from "../player-server";
import { Inject } from "shared/inject";

interface PlotAttributes {
	// id: number;
}

type PlotInstance = Model & {
	Teller: Teller;
};

@Component({
	tag: "Plot",
})
export class Plot
	extends DisposableComponent<PlotAttributes, PlotInstance>
	implements OnStart
{
	private static totalPlots = 0;

	public assets = new Map<string, GenericPlotAsset>();

	private id = -1;
	private bank: { [currency in Currency]: number } = {
		Silver: 0,
		Insight: 0,
		Valu: 0,
		Alignment: 0,
	};
	private owner?: PlayerServer;
	private teller!: ClickInteractable;

	@Inject
	private components!: Components;

	constructor(private currencyService: CurrencyService) {
		super();
	}

	public onStart(): void {
		this.id = ++Plot.totalPlots;

		this.teller = this.components.addComponent<ClickInteractable>(
			this.instance.Teller,
		);
		this.teller.onInteracted((player) => {
			if (player !== this.owner?.instance) return;
			this.currencyService.addCurrency(
				this.owner.instance,
				"Silver",
				this.bank.Silver,
			);
			this.bank.Silver = 0;
			this.instance.Teller.SurfaceGui.TextLabel.Text = `0`;
		});
	}

	public claim(player: Player): void {
		if (this.owner !== undefined) return;
		this.owner = this.components.getComponent<PlayerServer>(player);
		print(`${player.Name} claimed Plot ${this.id}`);
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public addAsset(asset: GenericPlotAsset): void {
		try {
			this.assets.set(asset.instance.Name, asset);
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
