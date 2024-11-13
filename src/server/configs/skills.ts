import { Modding } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CharacterServer } from "server/components/character-server";
import { HitService } from "server/services/hit-service";
import { ClassId } from "shared/configs/classes";
import { SkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponType } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";

export interface SkillConfig {
	readonly cooldown: number;
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined; //optional type is less readbale
	readonly activate: (user: CharacterServer) => void;
}

const hitService = Modding.resolveSingleton(HitService);
export const SKILLS: Record<SkillId, SkillConfig> = {
	"Goblet Throw": {
		cooldown: 2,
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: [],
		requiredWeaponType: undefined,
		activate: (user) => {
			if (!user.canAttack()) return;
			user.attack(
				"PommelStrike",
				() => {},
				() => {
					const clone = ReplicatedStorage.WorldModels.Goblet.Clone();
					clone.Parent = Workspace;

					const humanoidRootPart = user.getHumanoidRootPart();
					clone.PivotTo(humanoidRootPart.CFrame);
					const primaryPart = clone.PrimaryPart;
					if (primaryPart === undefined) return;
					primaryPart.CanCollide = false;
					primaryPart.AssemblyLinearVelocity =
						humanoidRootPart.CFrame.LookVector.add(
							Vector3.yAxis.mul(1),
						).mul(50);
				},
				() => {},
				0.5,
				0,
			);
		},
	},
	"Pommel Strike": {
		cooldown: 12,
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 10,
		},
		requiredClasses: ["Warrior"],
		requiredWeaponType: WeaponType.Sword,
		activate: (user) => {
			// if (!user.canAttack()) return;
			const hitboxSize = new Vector3(6, 5, 6);
			const humanoidRootPartCFrame = user.getHumanoidRootPart().CFrame;
			const cframeOffset = humanoidRootPartCFrame.LookVector.mul(
				hitboxSize.Z,
			);
			user.attack(
				"PommelStrike",
				() => {},
				() => {
					spawnHitbox(
						humanoidRootPartCFrame.add(cframeOffset),
						hitboxSize,
						[user.instance],
						true,
					).forEach((hitModel) => {
						hitModel.AddTag("Concussion");
						hitService.registerHit(
							user,
							hitModel,
							getWeaponConfig("Bronze Sword"),
							{
								ragdollDuration: 2,
								knockbackDuration: 1,
								knockbackForce: 20,
								breaksBlock: false,
							},
						);
					});
				},
				() => {},
				0,
				1,
			);
		},
	},
	"Triple Strike": {
		cooldown: 12,
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 10,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: ["Pit Fighter"],
		requiredWeaponType: WeaponType.Spear,
		activate: (user) => {
			// if (!user.canAttack()) return;
			const hitboxSize = new Vector3(6, 5, 7);
			const humanoidRootPartCFrame = user.getHumanoidRootPart().CFrame;
			const cframeOffset = humanoidRootPartCFrame.LookVector.mul(
				hitboxSize.Z,
			);
			user.attack(
				"TripleStrike",
				() => {},
				() => {
					spawnHitbox(
						humanoidRootPartCFrame.add(cframeOffset),
						hitboxSize,
						[user.instance],
						true,
					).forEach((hitModel) => {
						hitService.registerHit(
							user,
							hitModel,
							getWeaponConfig("Bronze Spear"),
							{
								ragdollDuration: 0,
								knockbackDuration: 0,
								knockbackForce: 0,
								breaksBlock: false,
							},
						);
					});
				},
				() => {},
				0,
				2,
			);
		},
	},
	Agility: {
		cooldown: 15,
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: ["Thief"],
		requiredWeaponType: WeaponType.Spear,
		activate: (user) => {
			// emit the particle
			// play the sound effect
			// increase player speed by some multiplier
		},
	},
};
