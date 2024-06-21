import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { ClickInteractable } from "../interactable/click-interactable";
import { CurrencyService } from "server/services/currency-service";
import { Currency } from "../../../../types/currency";
import { PlayerServer } from "../player-server";
import { Inject } from "shared/inject";
import { Players } from "@rbxts/services";
import { Pad } from "./pad";
import { AssetPad } from "./pad/asset-pad";

type PlotInstance = Model & {
	Teller: Teller;
	ClaimDoor: BasePart;
};

@Component({
	tag: "Plot",
})
export class Plot
	extends DisposableComponent<{}, PlotInstance>
	implements OnStart
{
	private static totalPlots = 0;

	private id = -1;
	private pads = new Map<string, AssetPad>();
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
			.forEach((value) => task.spawn(() => this.initDescendant(value)));

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
		const pad = this.components.getComponent<AssetPad>(instance);
		if (!pad) return;
		if (this.pads.has(pad.instance.Name)) {
			warn(`duplicate pad @ ${instance}`);
		}

		const asset = pad.getAsset();
		while (!asset) task.wait();

		this.pads.set(asset.instance.Name, pad);

		pad.hide();
		pad.enable();
		asset.hide();
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
		this.refreshPads();
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public deposit(currency: Currency, value: number): void {
		this.bank[currency] += value;
		this.instance.Teller.SurfaceGui.TextLabel.Text = `${this.bank[currency]}`;
	}

	public refreshPads(): void {
		if (!this.owner) return;
		for (const [assetName, pad] of this.pads) {
			const asset = pad.getAsset();
			if (!asset) continue;
			if (asset.attributes.bought) continue;
			if (!asset.hasPrerequisites(this.owner)) continue;

			pad.show();
		}
	}
}
