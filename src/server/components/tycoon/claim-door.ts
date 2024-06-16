import { Component, Components } from "@flamework/components";
import { Players } from "@rbxts/services";
import {
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";

interface ClaimDoorAttributes extends PlotAssetAttributes {}

type ClaimDoorInstance = PlotAssetInstance & {
	Collider: BasePart;
};

@Component({
	tag: "ClaimDoor",
	defaults: {
		enabled: false,
		bought: false,
		unlocked: true,
	},
})
export class ClaimDoor extends PlotAsset<
	ClaimDoorAttributes,
	ClaimDoorInstance
> {
	private touchedConnection?: RBXScriptConnection;

	protected override onEnabled(): void {
		this.model.show();
		this.touchedConnection = this.trove.connect(
			this.instance.Collider.Touched,
			(part) => this.onTouched(part),
		);
	}

	protected override onDisabled(): void {
		this.model.hide();
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
