import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import {
	BASE_CLIMB_SPEED,
	BASE_JUMP_POWER,
	BASE_WALK_SPEED,
} from "shared/configs";
import { Stat } from "shared/modules/stat";
import { AbstractRagdoll } from "./ragdoll";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
	isBlocking: boolean;
	isAttacking: boolean;
	combo: number;
	lightAttackDebounce: boolean;
	heavyAttackDebounce: boolean;
	stunTimer: number;
}

@Component()
export abstract class AbstractCharacter
	extends BaseComponent<CharacterAttributes, Model>
	implements OnStart
{
	static readonly TAG = "Character";

	protected raycastParams = new RaycastParams();
	protected humanoid!: Humanoid;
	protected abstract ragdoll: AbstractRagdoll;
	protected abstract readonly inventoryFolder: Folder;
	protected abstract readonly skillsFolder: Folder;

	protected manaChargeRate = new Stat(-1);
	protected walkSpeed = new Stat(BASE_WALK_SPEED);
	protected climbSpeed = new Stat(BASE_CLIMB_SPEED);

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;

		this.raycastParams.AddToFilter(this.instance);

		const character = promiseR6(this.instance).expect();
		character.Humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);
		this.humanoid = character.Humanoid;

		this.walkSpeed.onModifiersChanged(() => {
			this.setWalkSpeed(this.walkSpeed.getCalculatedValue());
		});
	}

	getHumanoid(): Humanoid {
		return promiseR6(this.instance).expect().Humanoid;
	}

	getAnimator(): Animator {
		return promiseR6(this.instance).expect().Humanoid.Animator;
	}

	getHead() {
		return promiseR6(this.instance).expect().Head;
	}

	getTorso() {
		return promiseR6(this.instance).expect().Torso;
	}

	getHumanoidRootPart() {
		return promiseR6(this.instance).expect().HumanoidRootPart;
	}

	getRaycastParams(): RaycastParams {
		return this.raycastParams;
	}

	getWalkSpeed(): Stat {
		return this.walkSpeed;
	}

	resetWalkSpeed(): void {
		this.getHumanoid().WalkSpeed = this.walkSpeed.getCalculatedValue();
	}

	setWalkSpeed(speed: number): void {
		this.getHumanoid().WalkSpeed = speed;
	}

	canAttack(): boolean {
		return (
			this.attributes.isAlive &&
			!(
				this.attributes.stunTimer > 0 ||
				this.attributes.isBlocking ||
				this.attributes.isAttacking ||
				this.ragdoll.attributes.isRagdolled
			)
		);
	}

	canLightAttack(): boolean {
		return this.canAttack() && !this.attributes.lightAttackDebounce;
	}

	canHeavyAttack(): boolean {
		return this.canAttack() && !this.attributes.heavyAttackDebounce;
	}

	canBlock(): boolean {
		return (
			this.attributes.isAlive &&
			!(
				this.attributes.stunTimer > 0 ||
				this.attributes.isBlocking ||
				this.attributes.isAttacking ||
				this.ragdoll.attributes.isRagdolled
			)
		);
	}

	toggleJump(enable: boolean): void {
		this.getHumanoid().JumpPower = enable ? BASE_JUMP_POWER : 0;
	}
}
