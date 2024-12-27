import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { BASE_JUMP_POWER } from "shared/configs";
import { Stat } from "shared/modules/stat";
import { AbstractRagdoll } from "./ragdoll";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
	isBlocking: boolean;
	isAttacking: boolean;
	isCarried: boolean;
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

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;

		this.raycastParams.AddToFilter(this.instance);

		const character = promiseR6(this.instance).expect();
		character.Humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);
		this.humanoid = character.Humanoid;
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

	isStunned(): boolean {
		return this.attributes.stunTimer > 0;
	}

	canAttack(): boolean {
		return (
			this.attributes.isAlive &&
			!(
				this.isStunned() ||
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
				this.isStunned() ||
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
