import { Component, Components } from "@flamework/components";
import { Pad, PadInstance } from ".";
import { Inject } from "shared/inject";
import { Furniture } from "../asset/furniture";
import { CurrencyService } from "server/services/currency-service";
import { ModelComponent } from "shared/components/model";
import { Asset } from "../asset";
import { PlayerServer } from "server/components/player-server";
import { Ability } from "../asset/ability";
import { Flamework } from "@flamework/core";

type AssetPadInstance = PadInstance;

@Component({
	tag: "AssetPad",
})
export class AssetPad extends Pad<{}, AssetPadInstance> {
	protected asset!: Asset;

	@Inject
	private components!: Components;
	@Inject
	private currencyService!: CurrencyService;

	public override onStart(): void {
		super.onStart();

		const assetName = this.instance.Name.sub(0, -4);
		this.instance.Collider.BillboardGui.Frame.TextLabel.Text = assetName;

		const furnitureInstance =
			this.instance.FindFirstChildOfClass("ObjectValue")?.Value;
		if (furnitureInstance) {
			const furnitureModel =
				this.components.getComponent<ModelComponent>(furnitureInstance);
			if (!furnitureModel)
				error("furniture instance missing Model component");
			this.asset = new Furniture(
				furnitureInstance.Name,
				this.currencyService,
				furnitureModel,
			);
		} else {
			this.asset = new Ability(assetName, this.currencyService);
		}
	}

	protected override handleInteracted(player: Player): void {
		if (!this.asset) {
			error("where the asset at");
		}

		const playerComponent =
			this.components.getComponent<PlayerServer>(player);
		if (!playerComponent) return;
		const bought = this.asset.buy(playerComponent);
		if (!bought) return;

		super.handleInteracted(player);
	}

	public getAsset(): Asset {
		return this.asset;
	}
}
