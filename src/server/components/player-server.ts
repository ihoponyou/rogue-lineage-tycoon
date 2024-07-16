import { Component, Components } from "@flamework/components";
import { Workspace } from "@rbxts/services";
import { ASSETS } from "server/configs/tycoon";
import { store } from "server/store";
import { AbstractPlayer } from "shared/components/abstract-player";
import { Inject } from "shared/inject";
import { selectHealth } from "shared/store/slices/players/slices/resources/selectors";
import { selectLives } from "shared/store/slices/players/slices/stats/selectors";
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

	public addAsset(assetName: string): void {
		if (!ASSETS[assetName]) error(`asset "${assetName}" does not exist`);
		this.assets.push(assetName);
	}

	public async loadCharacter(
		leavingPurgatory: boolean = false,
	): Promise<CharacterServer> {
		return new Promise((resolve, reject, onCancel) => {
			if (this.instance.Parent === undefined) {
				reject("player has already left");
				return;
			}
			this.instance.LoadCharacter();

			while (this.instance.Character === undefined)
				this.instance.CharacterAdded.Wait();

			const health = store.getState(selectHealth(this.UserId));
			if (health !== undefined && health <= 0) {
				store.resetLifeValues(this.UserId);
			}

			if (leavingPurgatory) {
				store.setLives(this.instance.UserId, 3);
				// TODO: choose random town spawn
				store.setPosition(this.UserId, Vector3.zero);
				store.setRotation(this.UserId, 0);
			} else {
				const lives = store.getState(selectLives(this.UserId));
				if (lives !== undefined && lives <= 0) {
					const purgatorySpawn = Workspace.HouseOfPurgatory.Spawn;
					store.setPosition(this.UserId, purgatorySpawn.Position);
					store.setRotation(
						this.UserId,
						purgatorySpawn.CFrame.ToEulerAnglesXYZ()[1],
					);
				}
			}

			this.components
				.waitForComponent<CharacterServer>(this.instance.Character)
				.andThen(
					(component) => {
						component.loadHealth();
						component.loadConditions();
						component.loadTransform();
						resolve(component);
					},
					(reason) => reject(reason),
				);
		});
	}
}
