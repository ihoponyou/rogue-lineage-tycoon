import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { BASE_WALK_SPEED } from "shared/configs";
import { AbstractRagdoll } from "./ragdoll";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
	isStunned: boolean;
	isBlocking: boolean;
	isAttacking: boolean;
	combo: number;
	lightAttackDebounce: boolean;
	heavyAttackDebounce: boolean;
}

const DEFAULT_JUMP_POWER = 50;

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

	onStart(): void {
		const character = promiseR6(this.instance).expect();
		this.humanoid = character.Humanoid;

		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;

		this.raycastParams.AddToFilter(this.instance);

		this.humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);

		this.onAttributeChanged("isStunned", (stunned, _wasStunned) => {
			if (stunned) {
				this.setWalkSpeed(0);
				this.toggleJump(false);
			} else {
				this.resetWalkSpeed();
				this.toggleJump(true);
			}
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

	getWalkSpeed(): number {
		return BASE_WALK_SPEED; // plus bonuses
	}

	resetWalkSpeed(): void {
		this.getHumanoid().WalkSpeed = this.getWalkSpeed();
	}

	setWalkSpeed(speed: number): void {
		this.getHumanoid().WalkSpeed = speed;
	}

	canAttack(): boolean {
		return (
			this.attributes.isAlive &&
			!(
				this.attributes.isStunned ||
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
				this.attributes.isStunned ||
				this.attributes.isBlocking ||
				this.attributes.isAttacking ||
				this.ragdoll.attributes.isRagdolled
			)
		);
	}

	toggleJump(enable: boolean): void {
		this.getHumanoid().JumpPower = enable ? DEFAULT_JUMP_POWER : 0;
	}
}
