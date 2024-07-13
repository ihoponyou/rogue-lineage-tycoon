import { Component, Components } from "@flamework/components";
import { ASSETS } from "server/configs/tycoon";
import { AbstractPlayer } from "shared/components/abstract-player";
import { Inject } from "shared/inject";
import { CharacterServer } from "./character-server";

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer {
	private assets = new Array<string>();

	@Inject
	private components!: Components;

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

	public async loadCharacter(): Promise<CharacterServer> {
		return new Promise((resolve, reject, onCancel) => {
			this.instance.LoadCharacter();
			while (this.instance.Character === undefined)
				this.instance.CharacterAdded.Wait();
			this.components
				.waitForComponent<CharacterServer>(this.instance.Character)
				.andThen(
					(component) => resolve(component),
					(reason) => reject(reason),
				);
		});
	}
}
