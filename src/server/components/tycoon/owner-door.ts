import { Component, Components } from "@flamework/components";
import { Players } from "@rbxts/services";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";

interface OwnerDoorAttributes extends PlotAssetAttributes {}

type OwnerDoorInstance = PlotAssetInstance;

@Component({
	tag: "OwnerDoor",
	defaults: {
		enabled: true,
		bought: true,
		unlocked: true,
		cost: 0,
		currency: "Silver",
	},
})
export class OwnerDoor extends PlotAsset<
	OwnerDoorAttributes,
	OwnerDoorInstance
> {
	private touchedConnection?: RBXScriptConnection;

	protected override onEnabled(): void {
		this.show();
		this.touchedConnection = this.trove.connect(
			this.instance.Touched,
			(part) => this.onTouched(part),
		);
	}

	protected override onDisabled(): void {
		this.hide();
		if (this.touchedConnection) this.trove.remove(this.touchedConnection);
		this.touchedConnection = undefined;
	}

	private onTouched(part: BasePart): void {
		if (this.plot.getOwner() !== undefined) return;
		const characterModel = part.Parent as Model | undefined;
		if (!(characterModel && characterModel.ClassName === "Model")) return;
		const player = Players.GetPlayerFromCharacter(characterModel);
		if (!player) return;

		this.plot.claim(player);
	}
}
