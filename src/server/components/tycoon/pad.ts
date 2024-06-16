import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Plot } from "./plot";
import { ModelComponent } from "shared/components/model";
import { PlotAsset } from "./plot-asset";
import { Inject } from "shared/inject";
import { DisposableComponent } from "shared/components/disposable-component";
import { Toggleable } from "shared/toggleable";
import { Hideable } from "shared/hideable";

type PadInstance = Model & {
	Part: Part & {
		BillboardGui: BillboardGui & {
			Frame: Frame & {
				TextLabel: TextLabel;
			};
		};
	};
	Asset: ObjectValue;
};

@Component({
	tag: "Pad",
})
export class Pad
	extends DisposableComponent<{}, PadInstance>
	implements OnStart, Toggleable, Hideable
{
	private asset?: PlotAsset;

	@Inject
	private components!: Components;

	constructor(private model: ModelComponent) {
		super();
	}

	public onStart(): void {
		const assetInstance = this.instance.Asset.Value;
		if (!assetInstance) error("unassigned asset");

		this.instance.Part.BillboardGui.Frame.TextLabel.Text =
			assetInstance.Name;

		this.components
			.waitForComponent<PlotAsset>(assetInstance)
			.andThen((component) => (this.asset = component))
			.await();
		if (!this.asset) error("assigned asset missing PlotAsset component");
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

		if (!this.asset.attributes.bought) return;

		this.hide();
		this.disable();
	}

	public setAsset(asset: PlotAsset): void {
		this.asset = asset;
	}

	public getAsset(): PlotAsset | undefined {
		return this.asset;
	}

	public enable(): void {
		this.trove.connect(this.instance.Part.Touched, (part) =>
			this.onTouched(part),
		);
	}

	public disable(): void {
		this.trove.clean();
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
