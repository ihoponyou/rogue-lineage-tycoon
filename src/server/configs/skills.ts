import { Components } from "@flamework/components";
import { Modding } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CharacterServer } from "server/components/character-server";
import { DoorServer } from "server/components/door-server";
import { PlayerCharacter } from "server/components/player-character";
import { Events } from "server/network";
import { HitService } from "server/services/hit-service";
import { store } from "server/store";
import { selectPlayerCurrencies } from "server/store/selectors";
import { AbstractCharacter } from "shared/components/abstract-character";
import { ClassId } from "shared/configs/classes";
import { ActiveSkillId, PassiveSkillId, SkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponType } from "shared/configs/weapons";
import { INTERACT_RADIUS } from "shared/constants";
import { spawnHitbox } from "shared/modules/hitbox";
import { StatModifierType } from "shared/modules/stat";
import { LAST_LIGHT_ATTACK_DATA, LIGHT_ATTACK_DATA } from "./constants";

const hitService = Modding.resolveSingleton(HitService);
const components = Modding.resolveSingleton(Components);

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
		activate: (user) => {
			Events.playEffect.broadcast("StartActionSurge", user.instance);
			user.attackSpeed.addTemporaryModifier(
				"action_surge",
				StatModifierType.Addend,
				5,
				1.5,
			);
			task.wait(1.5);
			Events.playEffect.broadcast("StopActionSurge", user.instance);
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
		activate: (user) => {
			user.playAnimation("Pickpocket");

			const victims = spawnHitbox(
				user.getHumanoidRootPart().CFrame,
				user.getHumanoidRootPart().Size.mul(3),
				user.getRaycastParams().FilterDescendantsInstances,
			);
			let totalAmountStolen = 0;
			for (const victim of victims) {
				const victimPlayer = components
					.getComponent<PlayerCharacter>(victim)
					?.getPlayer().instance;
				if (victimPlayer === undefined) {
					continue;
				}

				const victimSilverAmount = store.getState(
					selectPlayerCurrencies(victimPlayer),
				)?.Silver.amount;
				if (victimSilverAmount === undefined) {
					error(`${victimPlayer.Name} is super broke`);
				}
				const PERCENT_TO_STEAL = 0.05;
				const amountToSteal = math.ceil(
					victimSilverAmount * PERCENT_TO_STEAL,
				);
				store.addCurrency(victimPlayer, "Silver", -amountToSteal);

				totalAmountStolen += amountToSteal;
			}

			const userPlayer = components
				.getComponent<PlayerCharacter>(user.instance)
				?.getPlayer().instance;
			if (userPlayer === undefined) {
				return;
			}
			store.addCurrency(userPlayer, "Silver", totalAmountStolen);
		},
	},
	"Lock Manipulation": {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 0,
		activate: (user) => {
			const params = new OverlapParams();
			params.AddToFilter(user.instance);

			const humanoidRootPart = user.getHumanoidRootPart();
			const partsWithinInteractRadius = Workspace.GetPartBoundsInRadius(
				humanoidRootPart.Position,
				INTERACT_RADIUS,
				params,
			);
			let door: DoorServer | undefined;
			let minDistanceToCharacter = math.huge;
			for (const part of partsWithinInteractRadius) {
				const doorServer = components.getComponent<DoorServer>(part);
				if (doorServer === undefined || doorServer.attributes.isOpen) {
					continue;
				}
				// we want to find closest door to character
				const distanceToCharacter = doorServer.instance.Position.sub(
					humanoidRootPart.Position,
				).Magnitude;
				if (distanceToCharacter < minDistanceToCharacter) {
					minDistanceToCharacter = distanceToCharacter;
					door = doorServer;
				}
			}
			if (door === undefined) {
				return;
			}

			const humanoid = user.getHumanoid();

			humanoid.AutoRotate = false;
			user.playAnimation("LockManipulation");
			user.walkSpeed.addModifier(
				"lockpicking",
				StatModifierType.Multiplier,
				0,
			);

			Events.playEffect.broadcast("Lockpicking", user.instance);

			task.wait(3);

			humanoid.AutoRotate = true;
			user.stopAnimation("LockManipulation");
			user.walkSpeed.removeModifier(
				"lockpicking",
				StatModifierType.Multiplier,
			);

			door.toggleUnlocked();
		},
	},
	Stealth: {
		weaponXpRequired: NO_WEAPON_XP_REQUIRED,
		requiredClasses: [],
		requiredWeaponType: undefined,
		cooldown: 0,
		activate: (user) => {
			Events.playEffect.broadcast("StartStealth", user.instance);
			task.wait(10);
			Events.playEffect.broadcast("StopStealth", user.instance);
		},
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
