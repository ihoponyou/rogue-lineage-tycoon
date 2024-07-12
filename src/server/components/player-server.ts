import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ASSETS } from "server/configs/tycoon";
import { store } from "server/store";
import { AbstractPlayer } from "shared/components/player";
import { selectLives } from "shared/store/slices/players/slices/stats/selectors";

@Component({
	tag: "Player",
	defaults: {
		lives: 0,
		days: 0,
	},
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	private assets = new Array<string>();

	public onStart(): void {
		this.trove.add(
			store.subscribe(
				selectLives(this.instance.UserId),
				(lives, previousLives) => {
					if (lives === undefined || previousLives === undefined)
						return;
					this.onLivesChanged(lives, previousLives);
				},
			),
		);
	}

	private onLivesChanged(lives: number, previousLives: number): void {
		// print(lives);
	}

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
