import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Plot } from "./plot";
import { ModelComponent } from "shared/components/model";
import { PlotAsset } from "./plot-asset";
import { Inject } from "shared/inject";

type PadInstance = Model & {
	Part: Part & { BillboardGui: BillboardGui };
	Asset: ObjectValue;
};

@Component({
	tag: "Pad",
})
export class Pad extends BaseComponent<{}, PadInstance> implements OnStart {
	private asset?: PlotAsset;
	private touchedConnection?: RBXScriptConnection;

	@Inject
	private components!: Components;

	constructor(private model: ModelComponent) {
		super();
	}

	public onStart(): void {
		const assetInstance = this.instance.Asset.Value;
		if (!assetInstance) error("unassigned asset");
		this.components
			.waitForComponent<PlotAsset>(assetInstance)
			.andThen((component) => (this.asset = component))
			.await();
		if (!this.asset) error("assigned asset missing PlotAsset component");

		this.touchedConnection = this.instance.Part.Touched.Connect((part) =>
			this.onTouched(part),
		);
	}

	private onTouched(otherPart: BasePart): void {
		const parent = otherPart.Parent;
		if (!parent) return;
		const player = Players.GetPlayerFromCharacter(parent);
		if (!player) return;

		if (!this.asset) {
			error("where the asset at");
		}

		this.asset.buy(player);

		this.model.hide();

		this.touchedConnection?.Disconnect();
		this.touchedConnection = undefined;
	}

	public setAsset(asset: PlotAsset): void {
		this.asset = asset;
	}

	public hide(): void {
		this.model.hide();
		this.instance.Part.BillboardGui.Enabled = false;
	}

	public show(): void {
		this.model.show();
		this.instance.Part.BillboardGui.Enabled = true;
	}
}
