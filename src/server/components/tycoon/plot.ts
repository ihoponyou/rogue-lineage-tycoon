import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { DisposableComponent } from "shared/components/disposable-component";
import { ModelComponent } from "shared/components/model";
import { Inject } from "shared/inject";
import { Currency } from "../../../../types/currency";
import { Clickable } from "../interactable/clickable";
import { PlayerServer } from "../player-server";
import { Pad } from "./pad";

type PlotInstance = Model & {
	Teller: Teller;
	Assets: Folder;
	Pads: Folder;
};

@Component({
	tag: "Plot",
})
export class Plot
	extends DisposableComponent<{}, PlotInstance>
	implements OnStart
{
	private static plotOwners = new Map<Player, Plot>();

	private bank: { [currency in Currency]: number } = {
		Silver: 0,
		Insight: 0,
		Valu: 0,
		Alignment: 0,
	};
	private owner?: PlayerServer;
	private teller!: Clickable;
	private assets = new Map<string, ModelComponent>();

	@Inject
	private components!: Components;

	public onStart(): void {
		this.teller = this.components.getComponent<Clickable>(
			this.instance.Teller,
		)!;
		if (!this.teller) error("teller is not clickable");
		this.teller.onInteracted((player) => this.onTellerInteracted(player));

		this.instance.Assets.GetChildren().forEach((instance) => {
			const model =
				this.components.getComponent<ModelComponent>(instance);
			if (model === undefined) return;
			this.assets.set(instance.Name, model);
			if (instance.HasTag("HideOnUnlock")) return;
			model.hide();
		});

		this.instance.Pads.GetChildren().forEach((instance) => {
			const pad = this.components.getComponent<Pad>(instance);
			if (pad === undefined) return;
			pad.hide();
			pad.disable();
			pad.onPurchased(() => this.refreshPads());
		});
	}

	public getOwner(): PlayerServer | undefined {
		return this.owner;
	}

	public deposit(currency: Currency, value: number): void {
		this.bank[currency] += value;
		this.instance.Teller.SurfaceGui.TextLabel.Text = `${this.bank[currency]}`;
	}

	public claim(player: Player): void {
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) return;
		if (this.owner !== undefined) return;
		if (Plot.plotOwners.get(player) !== undefined) return;

		Plot.plotOwners.set(player, this);
		this.owner = playerServer;

		this.refreshPads();

		print(`${this.instance} claimed by ${this.owner.instance.Name}`);
	}

	public refreshPads(): void {
		const pads = this.instance.Pads.GetChildren();
		for (const instance of pads) {
			const pad = this.components.getComponent<Pad>(instance);
			if (pad === undefined) continue;
			if (this.owner === undefined) continue;
			if (this.owner.hasAsset(pad.attributes.assetName)) continue;
			if (!this.owner.hasAssetPrerequisites(pad.attributes.assetName))
				continue;
			pad.show();
			pad.enable();
		}
	}

	private onTellerInteracted(player: Player): void {
		if (!this.owner) return;
		if (player !== this.owner.instance) return;
		store.addCurrency(this.owner.instance, "Silver", this.bank.Silver);
		this.bank.Silver = 0;
		this.instance.Teller.SurfaceGui.TextLabel.Text = `0`;
	}
}
