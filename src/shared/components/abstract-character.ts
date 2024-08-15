import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { BASE_WALK_SPEED } from "shared/configs";
import { DisposableComponent } from "./disposable-component";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
	isStunned: boolean;
	isBlocking: boolean;
	combo: number;
	lightAttackCooldown: boolean;
}

const DEFAULT_JUMP_POWER = 50;

@Component()
export abstract class AbstractCharacter
	extends DisposableComponent<CharacterAttributes, Model>
	implements OnStart
{
	protected raycastParams = new RaycastParams();
	protected humanoid!: Humanoid;

	public onStart(): void {
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

	public getHumanoid(): Humanoid {
		return this.humanoid;
	}

	public getAnimator(): Animator {
		const animator = this.humanoid.FindFirstChild("Animator") as
			| Animator
			| undefined;
		if (!animator)
			error(`Animator not found in character ${this.instance.Name}`);
		return animator;
	}

	public getPlayer(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	public getHead(): Head {
		const head = this.instance.FindFirstChild("Head") as Head | undefined;
		if (!head) error(`Head not found in character ${this.instance.Name}`);
		return head;
	}

	public getTorso(): Torso {
		const torso = this.instance.FindFirstChild("Torso") as
			| Torso
			| undefined;
		if (!torso) error(`Torso not found in character ${this.instance.Name}`);
		return torso;
	}

	public getHumanoidRootPart(): HumanoidRootPart {
		const humanoidRootPart = this.instance.FindFirstChild(
			"HumanoidRootPart",
		) as HumanoidRootPart | undefined;
		if (!humanoidRootPart)
			error(`HRP not found in character ${this.instance.Name}`);
		return humanoidRootPart;
	}

	public getRaycastParams(): RaycastParams {
		return this.raycastParams;
	}

	public getWalkSpeed(): number {
		return BASE_WALK_SPEED; // plus bonuses
	}

	public resetWalkSpeed(): void {
		this.humanoid.WalkSpeed = this.getWalkSpeed();
	}

	public setWalkSpeed(speed: number): void {
		this.humanoid.WalkSpeed = speed;
	}

	public canAttack(): boolean {
		return (
			this.instance.GetAttribute("isRagdolled") === false &&
			!this.attributes.isStunned &&
			!this.attributes.isBlocking
		);
	}

	public canLightAttack(): boolean {
		return this.canAttack() && !this.attributes.lightAttackCooldown;
	}

	public canBlock(): boolean {
		return (
			this.instance.GetAttribute("isRagdolled") === false &&
			this.attributes.isAlive &&
			!this.attributes.isStunned &&
			!this.attributes.isKnocked
		);
	}

	public toggleJump(enable: boolean): void {
		this.humanoid.JumpPower = enable ? DEFAULT_JUMP_POWER : 0;
	}
}
