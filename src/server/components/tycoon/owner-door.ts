import { Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { DisposableComponent } from "shared/components/disposable-component";
import { Plot } from "./plot";
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
		enabled: false,
		cost: 0,
	},
})
export class OwnerDoor extends PlotAsset<
	OwnerDoorAttributes,
	OwnerDoorInstance
> {
	public override onStart(): void {
		super.onStart();

		this.trove.connect(this.instance.Touched, (part) =>
			this.onTouched(part),
		);
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
