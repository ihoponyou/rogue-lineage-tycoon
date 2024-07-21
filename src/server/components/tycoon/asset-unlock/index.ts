import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { Inject } from "shared/inject";
import { PlayerServer } from "../../player-server";
import { Pad } from "../pad";

export type AssetUnlockInstance = Instance & {
	Pad: ObjectValue;
};

@Component()
export abstract class AssetUnlock<
		A extends {} = {},
		I extends AssetUnlockInstance = AssetUnlockInstance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	protected pad!: Pad;

	@Inject
	protected components!: Components;

	public onStart(): void {
		const padInstance = this.instance.Pad.Value;
		if (padInstance === undefined) error("unassigned pad object");
		this.pad = this.components.waitForComponent<Pad>(padInstance).expect();
		this.pad.onPurchased((player) => this.unlock(player));
	}

	public abstract unlock(player: PlayerServer): void;
}
