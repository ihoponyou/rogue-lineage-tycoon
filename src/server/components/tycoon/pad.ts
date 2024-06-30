import { Component, Components } from "@flamework/components";
import { ModelComponent } from "shared/components/model";
import { Hideable } from "shared/hideable";
import { TouchableModel } from "server/components/interactable/touchable/touchable-model";

export type PadInstance = Model & {
	Collider: Part & {
		BillboardGui: BillboardGui & {
			Frame: Frame & {
				TextLabel: TextLabel;
			};
		};
	};
};

@Component({
	tag: "Pad",
})
export class Pad<A extends {} = {}, I extends PadInstance = PadInstance>
	extends TouchableModel<A, I>
	implements Hideable
{
	constructor(protected model: ModelComponent) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		const assetName = this.instance.Name.sub(0, -4);
		this.instance.Collider.BillboardGui.Frame.TextLabel.Text = assetName;

		this.enable();
	}

	public hide(): void {
		// print(debug.traceback());
		this.model.hide();
		this.instance.Collider.BillboardGui.Enabled = false;
	}

	public show(): void {
		// print(debug.traceback());
		this.model.show();
		this.instance.Collider.BillboardGui.Enabled = true;
	}
}
