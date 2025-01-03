import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { BASE_JUMP_POWER } from "shared/configs";
import { Stat } from "shared/modules/stat";
import { AbstractRagdoll } from "./ragdoll";
import { UsefulModel } from "./useful-model";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
	isBlocking: boolean;
	isAttacking: boolean;
	isCarried: boolean;
	isDashing: boolean;
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

	constructor(readonly usefulModel: UsefulModel) {
		super();
	}

	onStart(): void {
		this.raycastParams.CollisionGroup = "Characters";
		this.raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.raycastParams.IgnoreWater = true;
		this.raycastParams.RespectCanCollide = true;

		this.raycastParams.AddToFilter(this.instance);

		const character = promiseR6(this.instance).expect();
		character.Humanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);
		this.humanoid = character.Humanoid;
	}

	getHumanoid() {
		const rig = promiseR6(this.instance)
			.catch((reason) => debug.traceback(reason))
			.expect();
		if (typeIs(rig, "string")) {
			error(`wtf`);
		}
		return rig.Humanoid;
	}

	getAnimator(): Animator {
		return this.getHumanoid().Animator;
	}

	getHead(): Part {
		const head = this.instance.FindFirstChild("Head");
		if (head === undefined) error(`nil head`);
		return head as Part;
	}

	getTorso() {
		return promiseR6(this.instance).expect().Torso;
	}

	getHumanoidRootPart() {
		const rig = promiseR6(this.instance)
			.catch((reason) => debug.traceback(reason))
			.expect();
		if (typeIs(rig, "string")) {
			error(`wtf`);
		}
		return rig.HumanoidRootPart;
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
				this.attributes.isDashing ||
				this.ragdoll.attributes.isRagdolled
			)
		);
	}

	toggleJump(enable: boolean): void {
		this.getHumanoid().JumpPower = enable ? BASE_JUMP_POWER : 0;
	}
}
