import { Modding } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CharacterServer } from "server/components/character-server";
import { HitService } from "server/services/hit-service";
import { ClassId } from "shared/configs/classes";
import { ActiveSkillId, PassiveSkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponType } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { StatModifierType } from "shared/modules/stat";

const hitService = Modding.resolveSingleton(HitService);

interface SkillConfig {
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined; //optional type is less readbale
}

export interface ActiveSkillConfig extends SkillConfig {
	readonly cooldown: number;
	readonly activate: (user: CharacterServer) => void;
}

const NO_WEAPON_XP_REQUIRED = {
	[WeaponType.Dagger]: 0,
	[WeaponType.Fists]: 0,
	[WeaponType.Spear]: 0,
	[WeaponType.Sword]: 0,
};

export const ACTIVE_SKILLS: Record<ActiveSkillId, ActiveSkillConfig> = {
	"Goblet Throw": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 2,
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
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 10,
		},
		requiredClasses: ["Warrior"],
		requiredWeaponType: WeaponType.Sword,
		cooldown: 12,
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
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 10,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: ["Pit Fighter"],
		requiredWeaponType: WeaponType.Spear,
		cooldown: 12,
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
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: ["Thief"],
		requiredWeaponType: WeaponType.Dagger,
		cooldown: 30,
		activate: (user) => {
			// emit the particle
			// play the sound effect
			// increase player speed by some multiplier
			user.walkSpeed.addTemporaryModifier(
				10,
				"agility",
				1.25,
				StatModifierType.Multiplier,
				false,
			);
		},
	},
	"Dagger Throw": {
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 2,
		activate: (user) => {
			if (!user.canAttack()) return;
			user.attack(
				"PommelStrike",
				() => {},
				() => {},
				() => {},
				0.5,
				0,
			);
		},
	},
	Pickpocket: {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 0,
		activate: (user) => {},
	},
	"Lock Manipulation": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 0,
		activate: (user) => {},
	},
	Stealth: {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 0,
		activate: (user) => {},
	},
};

export const PASSIVE_SKILLS: Record<PassiveSkillId, SkillConfig> = {
	"Mercenary Carry": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
	},
	"Plate Training": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
	},
	"Spear Dash": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
	},
};
