import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { DisposableComponent } from "./disposable-component";

export interface CharacterAttributes {
	isKnocked: boolean;
	isAlive: boolean;
}

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

		this.trove.connect(this.humanoid.HealthChanged, (health) =>
			this.onHealthChanged(health),
		);
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
		return 20;
	}

	public resetToWalkSpeed(): void {
		this.humanoid.WalkSpeed = this.getWalkSpeed();
	}

	protected onHealthChanged(_health: number): void {}
}
