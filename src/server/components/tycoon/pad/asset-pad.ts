import { Component, Components } from "@flamework/components";
import { Pad, PadInstance } from ".";
import { PlotAsset } from "../plot-asset";
import { Inject } from "shared/inject";
import { OnStart } from "@flamework/core";

type AssetPadInstance = PadInstance & {
	Asset: ObjectValue;
};

@Component({
	tag: "AssetPad",
})
export class AssetPad extends Pad<{}, AssetPadInstance> implements OnStart {
	private asset?: PlotAsset;

	@Inject
	private components!: Components;

	public override onStart(): void {
		super.onStart();

		const assetInstance = this.instance.Asset.Value;
		if (!assetInstance) error("unassigned asset");

		this.instance.Collider.BillboardGui.Frame.TextLabel.Text =
			assetInstance.Name;

		this.components
			.waitForComponent<PlotAsset>(assetInstance)
			.andThen((component) => (this.asset = component))
			.await();
		if (!this.asset) error("assigned asset missing PlotAsset component");
	}

	protected override handleInteracted(player: Player): void {
		if (!this.asset) {
			error("where the asset at");
		}

		this.asset.buy(player);

		if (!this.asset.attributes.bought) return;

		super.handleInteracted(player);
	}

	getAsset(): PlotAsset | undefined {
		return this.asset;
	}

	public override hide(): void {
		super.hide();
		this.instance.Collider.BillboardGui.Enabled = false;
	}

	public override show(): void {
		super.show();
		this.instance.Collider.BillboardGui.Enabled = true;
	}
}
