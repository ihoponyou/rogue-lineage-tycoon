import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { getAssetConfig, getSkillConfig } from "server/configs/tycoon";
import { store } from "server/store";
import { selectPlayer } from "server/store/selectors";
import { AbstractPlayer } from "shared/components/abstract-player";
import { Inject } from "shared/inject";
import { deserializeVector3 } from "shared/modules/serialized-vector3";
import { Character } from "./character";

const TYCOON_FOLDER = Workspace.Tycoons;

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	private assets = new Array<string>();

	@Inject
	private components!: Components;

	public onStart(): void {
		const knownSkills = store.getState().get(tostring(this.UserId))?.skills;
		if (knownSkills) {
			for (const skillName of knownSkills) {
				getSkillConfig(skillName).teach(this.instance);
			}
		}
	}

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
	): Promise<Character> {
		return new Promise((resolve, reject) => {
			if (this.instance.Parent === undefined) {
				reject("player has already left");
				return;
			}
			this.instance.LoadCharacter();

			while (this.instance.Character === undefined)
				this.instance.CharacterAdded.Wait();

			const playerState = store.getState(selectPlayer(this.instance));

			const health = playerState?.resources.health;
			if (health !== undefined && health <= 0) {
				store.resetLifeValues(this.instance);
			}

			if (leavingPurgatory) {
				store.setLives(this.instance, 3);
				// TODO: choose random town spawn
				store.setPosition(this.instance, Vector3.zero);
				store.setRotation(this.instance, 0);
			} else {
				const lives = playerState?.stats.lives;
				if (lives !== undefined && lives <= 0) {
					const purgatorySpawn = Workspace.HouseOfPurgatory.Spawn;
					store.setPosition(this.instance, purgatorySpawn.Position);
					store.setRotation(
						this.instance,
						purgatorySpawn.CFrame.ToEulerAnglesXYZ()[1],
					);
				}
			}

			const transform = playerState?.transform;
			if (transform !== undefined) {
				const deserialedPos = deserializeVector3(transform.position);
				if (
					transform.position.Y <= Workspace.FallenPartsDestroyHeight
				) {
					store.setPosition(this.instance, Vector3.zero);
					store.setRotation(this.instance, 0);
				} else if (this.isInsideTycoon(deserialedPos)) {
					store.setPosition(this.instance, Vector3.zero);
					store.setRotation(this.instance, 0);
				}
			}

			this.components
				.waitForComponent<Character>(this.instance.Character)
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

	public getCharacter(): Character {
		const model = this.instance.Character;
		if (model === undefined)
			error(`${this.instance.Name}.Character is undefined`);
		const character = this.components.getComponent<Character>(model);
		if (character === undefined)
			error(
				`${this.instance.Name}'s character missing character component`,
			);
		return character;
	}

	public teach(skillName: string): void {
		if (this.hasSkill(skillName)) return;
		getSkillConfig(skillName).teach(this.instance);
		store.addSkill(this.instance, skillName);
	}

	public hasSkill(skillName: string): boolean {
		return (
			store
				.getState()
				?.get(tostring(this.UserId))
				?.skills.includes(skillName) ?? false
		);
	}

	private isInsideTycoon(position: Vector3): boolean {
		const character = this.instance.Character;
		if (character === undefined) error("nil character");
		for (const tycoon of TYCOON_FOLDER.GetChildren()) {
			if (!tycoon.IsA("Model")) continue;
			const [cframe, size] = tycoon.GetBoundingBox();
			// i know its not technically a radius so SHUT UP!!!!!!
			const xRadius = size.X / 2;
			const withinX =
				position.X >= cframe.Position.X - xRadius &&
				position.X <= cframe.Position.X + xRadius;
			const yRadius = size.Y / 2;
			const withinY =
				position.Y >= cframe.Position.Y - yRadius &&
				position.Y <= cframe.Position.Y + yRadius;
			const zRadius = size.Z / 2;
			const withinZ =
				position.Z >= cframe.Position.Z - zRadius &&
				position.Z <= cframe.Position.Z + zRadius;
			if (withinX && withinY && withinZ) return true;
		}
		return false;
	}
}
