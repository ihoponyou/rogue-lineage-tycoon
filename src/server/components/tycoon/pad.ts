import { Component, Components } from "@flamework/components";
import { ClickInteractable } from "../interactable/click-interactable";
import { Plot } from "./plot";
import { Dependency } from "@flamework/core";
import {
	GenericPlotAsset,
	PlotAsset,
	PlotAssetAttributes,
	PlotAssetInstance,
} from "./plot-asset";
import { Dropper } from "./dropper";

interface PadAttributes {}

type PadInstance = (BasePart | Model) & {
	Parent: Instance;
};

@Component({
	tag: "Pad",
})
export class Pad extends ClickInteractable<PadAttributes, PadInstance> {
	protected onInteract(player: Player): void {
		print("interacted");
		this.interact();
	}
}
