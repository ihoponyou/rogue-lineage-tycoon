import { Component } from "@flamework/components";
import { ASSETS } from "server/tycoon-config";
import { AbstractPlayer } from "shared/components/player";

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer {
	private assets = new Array<string>();

	public hasAsset(assetName: string): boolean {
		// print(`looking for ${assetName} in`, this.assets);
		return this.assets.includes(assetName);
	}

	public addAsset(assetName: string) {
		if (!ASSETS[assetName]) error(`asset "${assetName}" does not exist`);
		this.assets.push(assetName);
	}
}
