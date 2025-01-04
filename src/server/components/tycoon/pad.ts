import { Component, Components } from "@flamework/components";
import { ReplicatedStorage } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { TouchableModel } from "server/components/interactable/touchable/touchable-model";
import { getAssetConfig } from "server/configs/tycoon";
import { store } from "server/store";
import { selectPlayer } from "server/store/selectors";
import { Toggleable } from "shared/components/toggleable";
import { UsefulModel } from "shared/components/useful-model";
import { Hideable } from "shared/hideable";
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

	public constructor(
		toggleable: Toggleable,
		private components: Components,
		private model: UsefulModel,
	) {
		super(toggleable);
	}

	public override onStart(): void {
		super.onStart();

		this.plot = this.components
			// this wont break :)
			.waitForComponent<Plot>(this.instance.Parent!.Parent!)
			.expect();

		this.setupBillboard();

		this.toggle(true);
	}

	public onPurchased(callback: PurchaseCallback): void {
		this.trove.connect(this.purchased, (player) => callback(player));
	}

	isHidden(): boolean {
		return this.model.isHidden();
	}

	toggleHidden(bool?: boolean): void {
		this.model.toggleHidden(bool);
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
			// print(playerServer.Name, "missing prerequisites");
			return;
		}

		const currencyData = store.getState(selectPlayer(player))?.currencies[
			this.assetConfig.currency
		];
		if (currencyData === undefined) return;
		if (currencyData.amount < this.assetConfig.cost) {
			// print(playerServer.Name, "error = broke");
			return;
		}
		store.addCurrency(
			player,
			this.assetConfig.currency,
			-this.assetConfig.cost,
		);

		// print(`unlocked ${this.attributes.assetName}`);
		playerServer.addAsset(this.attributes.assetName);
		this.toggleHidden(true);
		this.toggle(false);

		this.purchased.Fire(playerServer);
	}

	private setupBillboard(): void {
		const labelsFrame = ReplicatedStorage.Assets.UI.PadLabels.Clone();

		labelsFrame.AssetLabel.Text =
			this.assetConfig.displayName ?? this.attributes.assetName;
		const cost = this.assetConfig.cost;
		labelsFrame.CostLabel.Text = cost <= 0 ? "FREE" : `$${cost}`;

		labelsFrame.Parent = this.instance.Collider.BillboardGui;
	}
}
