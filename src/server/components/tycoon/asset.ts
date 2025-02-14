import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Pad } from "./pad";
import { Unlockable } from "./unlockable";

export type AssetInstance = Instance & {
	Pad: ObjectValue;
};

@Component({
	tag: "Asset",
})
export class Asset extends BaseComponent<{}, AssetInstance> implements OnStart {
	private pad!: Pad;

	public constructor(
		private components: Components,
		private unlockable: Unlockable,
	) {
		super();
	}

	public onStart(): void {
		const padInstance = this.instance.Pad.Value;
		if (padInstance === undefined) error("unassigned pad object");
		this.pad = this.components.waitForComponent<Pad>(padInstance).expect();
		this.pad.onPurchased((player) => {
			this.unlockable.unlock(player.instance);
			// save asset?
		});
	}
}
