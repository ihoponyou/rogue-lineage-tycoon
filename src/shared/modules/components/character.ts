import { Component } from "@flamework/components";
import { DisposableComponent } from "./disposable-component";
import { Players } from "@rbxts/services";
import { OnStart } from "@flamework/core";
import { RagdollAttributes } from "./ragdoll";

export interface CharacterInstance extends StarterCharacter {
	Humanoid: Humanoid;
}

// this may be unsafe
export interface CharacterAttributes extends RagdollAttributes {}

@Component()
export abstract class Character<
		A extends CharacterAttributes,
		I extends CharacterInstance,
	>
	extends DisposableComponent<A, I>
	implements OnStart
{
	onStart(): void {
		this.instance.Humanoid.SetStateEnabled(
			Enum.HumanoidStateType.Dead,
			false,
		);

		this.trove.connect(this.instance.Humanoid.HealthChanged, (health) =>
			this.onHealthChanged(health),
		);
	}

	protected abstract onHealthChanged(health: number): void;

	getAnimator(): Animator {
		const animator = this.instance.Humanoid.FindFirstChild("Animator") as
			| Animator
			| undefined;
		if (!animator)
			error(`Animator not found in character ${this.instance.Name}`);
		return animator;
	}

	getPlayer(): Player {
		const player = Players.GetPlayerFromCharacter(this.instance);
		if (!player)
			error(`Player not found from character ${this.instance.Name}`);
		return player;
	}

	getHead(): Head {
		const head = this.instance.FindFirstChild("Head") as Head | undefined;
		if (!head) error(`Head not found in character ${this.instance.Name}`);
		return head;
	}

	getTorso(): Torso {
		const torso = this.instance.FindFirstChild("Torso") as
			| Torso
			| undefined;
		if (!torso) error(`Torso not found in character ${this.instance.Name}`);
		return torso;
	}

	getHumanoidRootPart(): HumanoidRootPart {
		const humanoidRootPart = this.instance.FindFirstChild(
			"HumanoidRootPart",
		) as HumanoidRootPart | undefined;
		if (!humanoidRootPart)
			error(`HRP not found in character ${this.instance.Name}`);
		return humanoidRootPart;
	}
}
