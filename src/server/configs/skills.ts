import { Modding } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CharacterServer } from "server/components/character-server";
import { PlayerCharacter } from "server/components/player-character";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { AbstractCharacter } from "shared/components/abstract-character";
import { ClassId } from "shared/configs/classes";
import { ActiveSkillId, PassiveSkillId, SkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponType } from "shared/configs/weapons";
import { spawnHitbox } from "shared/modules/hitbox";
import { StatModifierType } from "shared/modules/stat";
import { LAST_LIGHT_ATTACK_DATA, LIGHT_ATTACK_DATA } from "./constants";

const hitService = Modding.resolveSingleton(HitService);

interface SkillConfig {
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
}

export interface ActiveSkillConfig extends SkillConfig {
	readonly cooldown: number;
	readonly activate: (user: CharacterServer) => void;
	readonly requiredWeaponType: WeaponType | undefined; //optional type is less readbale
}

interface PassiveSkillConfig extends SkillConfig {
	readonly onLearn?: (character: PlayerCharacter) => void;
}

const NO_WEAPON_XP_REQUIRED = {
	[WeaponType.Dagger]: 0,
	[WeaponType.Fists]: 0,
	[WeaponType.Spear]: 0,
	[WeaponType.Sword]: 0,
};

function getCFrameOffsetFromHRP(
	character: AbstractCharacter,
	offset: number,
): CFrame {
	const humanoidRootPartCFrame = character.getHumanoidRootPart().CFrame;
	return humanoidRootPartCFrame.add(
		humanoidRootPartCFrame.LookVector.mul(offset),
	);
}

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
	"Action Surge": {
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 20,
		},
		requiredClasses: ["Warrior"],
		requiredWeaponType: WeaponType.Sword,
		cooldown: 12,
		activate: (user) => {},
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
			Events.playEffect.broadcast("StrikeCharge", user.instance);
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
						hitModel.AddTag("Concussion");
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
			Events.playEffect.broadcast("StrikeCharge", user.instance);
			Events.playEffect.broadcast("SpearEmit", user.instance);
			const hitboxSize = new Vector3(6, 5, 7);
			let swings = 0;
			user.attack(
				"TripleStrike",
				() => {},
				() => {
					const isLastSwing = ++swings >= 3;
					spawnHitbox(
						getCFrameOffsetFromHRP(user, hitboxSize.Z),
						hitboxSize,
						[user.instance],
						true,
					).forEach((hitModel) => {
						hitService.registerHit(
							user,
							hitModel,
							getWeaponConfig("Bronze Spear"),
							isLastSwing
								? LAST_LIGHT_ATTACK_DATA
								: LIGHT_ATTACK_DATA,
						);
					});
				},
				() => {},
				0,
				2,
			);
		},
	},
	"Serpent Strike": {
		weaponXpRequired: {
			[WeaponType.Dagger]: 0,
			[WeaponType.Fists]: 0,
			[WeaponType.Spear]: 0,
			[WeaponType.Sword]: 0,
		},
		requiredClasses: ["Pit Fighter"],
		requiredWeaponType: WeaponType.Spear,
		cooldown: 30,
		activate: (user) => {
			Events.playEffect.broadcast("StrikeCharge", user.instance);
			Events.playEffect.broadcast("SpearEmit", user.instance);
			const hitboxSize = new Vector3(6, 5, 7);
			user.attack(
				"SpearStrike",
				() => {},
				() => {
					spawnHitbox(
						getCFrameOffsetFromHRP(user, hitboxSize.Z),
						hitboxSize,
						[user.instance],
						true,
					).forEach((hitModel) => {
						hitService.registerHit(
							user,
							hitModel,
							getWeaponConfig("Bronze Spear"),
							LAST_LIGHT_ATTACK_DATA,
						);
						hitModel.AddTag("Poison");
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
			const removeWalkSpeedModifier = user.walkSpeed.addTemporaryModifier(
				"agility",
				StatModifierType.Multiplier,
				1.25,
				10,
				false,
			);
			const removeAttackSpeedModifier =
				user.attackSpeed.addTemporaryModifier(
					"agility",
					StatModifierType.Multiplier,
					1.25,
					10,
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

export const PASSIVE_SKILLS: Record<PassiveSkillId, PassiveSkillConfig> = {
	"Mercenary Carry": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
	"Plate Training": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
	"Spear Dash": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
	Mana: {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		onLearn: (character) => {
			character.getPlayer().instance.AddTag("Mana");
		},
	},
	"Mana Climb": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
	"Mana Dash": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
	"Mana Run": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
	},
};

export const SKILLS: Record<SkillId, SkillConfig> = {
	...PASSIVE_SKILLS,
	...ACTIVE_SKILLS,
};
