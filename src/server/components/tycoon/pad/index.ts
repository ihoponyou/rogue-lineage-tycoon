import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ModelComponent } from "shared/components/model";
import { Toggleable } from "shared/toggleable";
import { Hideable } from "shared/hideable";
import { TouchableModel } from "server/components/interactable/touchable/touchable-model";
import { Inject } from "shared/inject";

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
	constructor(protected model: ModelComponent) {
		super();
	}

	public override onStart(): void {
		super.onStart();

		this.instance.Collider.BillboardGui.Frame.TextLabel.Text = "Pad";

		this.onInteracted((player) => this.handleInteracted(player));
	}

	protected handleInteracted(player: Player): void {
		this.hide();
		this.disable();
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
