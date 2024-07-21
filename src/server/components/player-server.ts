import { Component, Components } from "@flamework/components";
import { Workspace } from "@rbxts/services";
import { getAssetConfig } from "server/configs/tycoon";
import { store } from "server/store";
import { AbstractPlayer } from "shared/components/abstract-player";
import { Inject } from "shared/inject";
import { selectHealth } from "shared/store/slices/players/slices/resources/selectors";
import { selectLives } from "shared/store/slices/players/slices/stats/selectors";
import { selectTransform } from "shared/store/slices/players/slices/transform/selectors";
import { CharacterServer } from "./character-server";

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer {
	private assets = new Array<string>();

	@Inject
	private components!: Components;

	public hasAsset(assetName: string): boolean {
		getAssetConfig(assetName);
		return this.assets.includes(assetName);
	}

	public hasAssetPrerequisites(assetName: string): boolean {
		const assetConfig = getAssetConfig(assetName);
		for (const reqName of assetConfig.prerequisites) {
			if (!this.hasAsset(reqName)) return false;
		}
		return true;
	}

	public addAsset(assetName: string): void {
		getAssetConfig(assetName);
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

			const transform = store.getState(selectTransform(this.UserId));
			if (
				transform !== undefined &&
				transform.position.Y <= Workspace.FallenPartsDestroyHeight
			) {
				store.setPosition(this.UserId, Vector3.zero);
				store.setRotation(this.UserId, 0);
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
