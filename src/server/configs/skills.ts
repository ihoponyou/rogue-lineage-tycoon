import { Modding } from "@flamework/core";
import { CharacterServer } from "server/components/character-server";
import { HitService } from "server/services/hit-service";
import { ClassId } from "shared/configs/classes";
import { SkillId } from "shared/configs/skills";
import { getWeaponConfig, WeaponType } from "shared/configs/weapons";

export interface SkillConfig {
	readonly cooldown: number;
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined;
	readonly activate: (user: CharacterServer) => void;
}

export enum TargetingStyle {
	ToCursor,
	Hitbox,
}

export enum TargetGroup {
	Friend,
	Foe,
}

export enum EffectTrigger {
	Immediate,
	OnHit,
	OnAnimationMarkerReached,
}

enum Effect {
	Damage,
	Knockback,
	Ragdoll,
	Stun,
}

abstract class AbstractEffect {}

class DamageEffect extends AbstractEffect {
	constructor(public readonly amount: number) {
		super();
	}
}

export enum KnockbackDirection {
	CasterToTarget,
	CasterLookVector,
}

class KnockbackEffect extends AbstractEffect {
	constructor(
		public readonly magnitude: number,
		public readonly ignoreGravity: boolean,
		public readonly direction: KnockbackDirection,
	) {
		super();
	}
}

interface Duration {
	readonly duration: number;
}

class RagdollEffect extends AbstractEffect implements Duration {
	constructor(public readonly duration: number) {
		super();
	}
}

class StunEffect extends AbstractEffect implements Duration {
	constructor(public readonly duration: number) {
		super();
	}
}

interface AbilityParams {
	animation?: Animation;
	manaCost: number;
	cooldown: number;
	targeting: {
		style: TargetingStyle;
		ignoredCollisionGroups: string[];
	};
	triggeredEffects: Array<{
		targetedGroups: TargetGroup[];
		triggeredBy: EffectTrigger;
		effectsToApply: AbstractEffect[];
	}>;
}

const hitser = Modding.resolveSingleton(HitService);
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
			print("threw a goblet");
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
		requiredClasses: [ClassId.WARRIOR],
		requiredWeaponType: WeaponType.Sword,
		activate: (user) => {
			// print("struck a pommel");
			user.playAnimation("PommelStrike");
			user.attack(
				"PommelStrike",
				() => print("swing"),
				() => {
					hitser.registerHit(
						user,
						user.instance,
						getWeaponConfig("Bronze Sword"),
						{
							ragdollDuration: 0,
							knockbackDuration: 0,
							knockbackForce: 0,
							breaksBlock: false,
						},
					);
				},
				() => print("stop"),
				undefined,
				1,
			);
		},
	},
};
