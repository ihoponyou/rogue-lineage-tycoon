import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import { PlayerServer } from "../player-server";
import { Inject } from "shared/inject";
import { Pad } from "./pad";
import { PlotAsset } from "./plot-asset";
import { Players } from "@rbxts/services";

interface PlotAttributes {
	// id: number;
}

type PlotInstance = Model & {
	Teller: Teller;
	ClaimDoor: BasePart;
};

@Component({
	tag: "Plot",
})
export class Plot
	extends DisposableComponent<PlotAttributes, PlotInstance>
	implements OnStart
{
	private static totalPlots = 0;

	private id = -1;
	private pads = new Map<string, Pad>();
	private assets = new Map<string, PlotAsset>();
	private bank: { [currency in Currency]: number } = {
		Silver: 0,
		Insight: 0,
		Valu: 0,
		Alignment: 0,
	};
	private owner?: PlayerServer;
	private teller!: ClickInteractable;
	private claimTouchedConnection?: RBXScriptConnection;

	@Inject
	private components!: Components;

	constructor(private currencyService: CurrencyService) {
		super();
	}

	public onStart(): void {
		this.id = ++Plot.totalPlots;

		this.instance
			.GetDescendants()
			.forEach((value) => this.initDescendant(value));

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

		this.instance.ClaimDoor.Touched.Connect((otherPart) =>
			this.onClaimDoorTouched(otherPart),
		);
	}

	private initDescendant(instance: Instance) {
		let component: PlotAsset | Pad | undefined;
		component = this.components.getComponent<Pad>(instance);
		if (component !== undefined) {
			if (this.pads.has(component.instance.Name)) {
				warn(`duplicate pad @ ${instance}`);
			}
			this.pads.set(component.instance.Name, component as Pad);
			component.hide();
			return;
		}
		component = this.components.getComponent<PlotAsset>(instance);
		if (!component) return;
		if (this.assets.has(component.instance.Name)) {
			warn(`duplicate asset @ ${instance}`);
			return;
		}
		this.assets.set(component.instance.Name, component);
		component.hide();
	}

	private onClaimDoorTouched(otherPart: BasePart): void {
		if (this.owner !== undefined) return;
		const parent = otherPart.Parent;
		if (!parent) return;
		const player = Players.GetPlayerFromCharacter(parent);
		if (!player) return;

		this.claim(player);
	}

	public claim(player: Player): void {
		if (this.owner !== undefined) return;
		this.owner = this.components.getComponent<PlayerServer>(player);
		if (!this.owner) return;

		print(`${this.instance} claimed by ${this.owner.instance.Name}`);

		this.claimTouchedConnection?.Disconnect();
		this.claimTouchedConnection = undefined;

		this.instance.ClaimDoor.Transparency = 1;

		// TODO: only unlocked pads
		for (const [assetName, pad] of this.pads) {
			pad.show();
			pad.enable();
		}
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public addAsset(asset: PlotAsset): void {
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
