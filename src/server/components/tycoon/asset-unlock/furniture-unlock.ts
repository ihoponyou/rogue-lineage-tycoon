import { Component } from "@flamework/components";
import { AssetUnlock, UnlockAttributes } from ".";
import { Furniture } from "../furniture";
import { setInterval } from "@rbxts/set-timeout";
import { PlayerServer } from "server/components/player-server";
import { Toggleable } from "shared/components/toggleable";

type FurnitureUnlockInstance = Instance & {
	Furniture: ObjectValue;
};

@Component({
	tag: "FurnitureUnlock",
})
export class FurnitureUnlock extends AssetUnlock<
	UnlockAttributes,
	FurnitureUnlockInstance
> {
	private furniture!: Furniture;

	public override onStart(): void {
		super.onStart();

		if (!this.instance.Furniture.Value)
			error("unassigned furniture instance");
		this.components
			.waitForComponent<Furniture>(this.instance.Furniture.Value)
			.andThen((furniture) => {
				this.furniture = furniture;
			})
			.catch(error);
	}

	public unlock(player: PlayerServer): void {
		this.furniture.show();
		const toggleable = this.components.getComponent<Toggleable>(
			this.furniture.instance,
		);
		toggleable?.toggle(true);
	}
}
