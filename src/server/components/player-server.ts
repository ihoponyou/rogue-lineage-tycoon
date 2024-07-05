import { Component } from "@flamework/components";
import { ASSETS } from "server/configs/tycoon";
import { AbstractPlayer } from "shared/components/player";

@Component({
	tag: "Player",
	defaults: {
		lives: 0,
		days: 0,
	},
})
export class PlayerServer extends AbstractPlayer {
	private assets = new Array<string>();

	public hasAsset(assetName: string): boolean {
		// print(`looking for ${assetName} in`, this.assets);
		return this.assets.includes(assetName);
	}

	public hasAssetPrerequisites(assetName: string): boolean {
		for (const reqName of ASSETS[assetName].prerequisites) {
			if (!this.hasAsset(reqName)) return false;
		}
		return true;
	}

	public addAsset(assetName: string) {
		if (!ASSETS[assetName]) error(`asset "${assetName}" does not exist`);
		this.assets.push(assetName);
	}
}
