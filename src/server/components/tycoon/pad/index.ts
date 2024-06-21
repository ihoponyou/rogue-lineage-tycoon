import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ModelComponent } from "shared/components/model";
import { Toggleable } from "shared/toggleable";
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

@Component()
export abstract class Pad<
		A extends {} = {},
		I extends PadInstance = PadInstance,
	>
	extends TouchableModel<A, I>
	implements Hideable
{
	constructor(private model: ModelComponent) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.instance.Collider.BillboardGui.Frame.TextLabel.Text =
			this.instance.Name.sub(0, -4);

		this.onInteracted((player) => this.handleInteracted(player));
	}

	protected handleInteracted(player: Player): void {
		this.hide();
		this.disable();
	}

	public hide(): void {
		this.model.hide();
		this.instance.Collider.BillboardGui.Enabled = false;
	}

	public show(): void {
		this.model.show();
		this.instance.Collider.BillboardGui.Enabled = true;
	}
}
