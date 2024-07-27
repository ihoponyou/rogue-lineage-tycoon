import { Component, Components } from "@flamework/components";
import { ReplicatedStorage } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { TouchableModel } from "server/components/interactable/touchable/touchable-model";
import { getAssetConfig } from "server/configs/tycoon";
import { store } from "server/store";
import { ModelComponent } from "shared/components/model";
import { Hideable } from "shared/hideable";
import { Inject } from "shared/inject";
import { selectCurrency } from "shared/store/slices/players/slices/currencies/selectors";
import { PlayerServer } from "../player-server";
import { Plot } from "./plot";

export interface PadAttributes {
	assetName: string;
}

export type PadInstance = Model & {
	Collider: Part & {
		BillboardGui: BillboardGui;
	};
};

type PurchaseCallback = (player: PlayerServer) => void;

@Component({
	tag: "Pad",
})
export class Pad
	extends TouchableModel<PadAttributes, PadInstance>
	implements Hideable
{
	private plot!: Plot;
	private assetConfig = getAssetConfig(this.attributes.assetName);
	private purchased = new Signal<PurchaseCallback>();

	@Inject
	private components!: Components;

	public constructor(private model: ModelComponent) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.plot = this.components
			// this wont break :)
			.waitForComponent<Plot>(this.instance.Parent!.Parent!)
			.expect();

		this.setupBillboard();

		this.enable();
	}

	public onPurchased(callback: PurchaseCallback): void {
		this.trove.connect(this.purchased, (player) => callback(player));
	}

	public hide(): void {
		this.model.hide();
	}

	public show(): void {
		this.model.show();
	}

	public override isPlayerAllowed(player: Player): boolean {
		const playerServer = this.components.getComponent<PlayerServer>(player);
		return (
			playerServer !== undefined && playerServer === this.plot.getOwner()
		);
	}

	public override interact(player: Player): void {
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (!playerServer) return;
		if (!playerServer.hasAssetPrerequisites(this.attributes.assetName)) {
			print(playerServer.Name, "missing prerequisites");
			return;
		}

		const currencyData = store.getState(
			selectCurrency(player.UserId, this.assetConfig.currency),
		);
		if (currencyData === undefined) return;
		if (currencyData.amount < this.assetConfig.cost) {
			print(playerServer.Name, "error = broke");
			return;
		}
		store.addCurrency(
			player.UserId,
			this.assetConfig.currency,
			-this.assetConfig.cost,
		);

		print(`unlocked ${this.attributes.assetName}`);
		playerServer.addAsset(this.attributes.assetName);
		this.hide();
		this.disable();

		this.purchased.Fire(playerServer);
	}

	private setupBillboard(): void {
		const labelsFrame = ReplicatedStorage.Assets.UI.PadLabels.Clone();

		labelsFrame.AssetLabel.Text = this.assetConfig.displayName;
		const cost = this.assetConfig.cost;
		labelsFrame.CostLabel.Text = cost <= 0 ? "FREE" : `$${cost}`;

		labelsFrame.Parent = this.instance.Collider.BillboardGui;
	}
}
