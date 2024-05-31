import { BaseComponent, Component } from "@flamework/components";

export interface RagdollAttributes {
	isRagdolled: boolean;
}

@Component()
export abstract class Ragdoll extends BaseComponent<RagdollAttributes, Model> {
	protected humanoid = this.instance.WaitForChild("Humanoid") as Humanoid;

	protected configureHumanoid(): void {
		this.humanoid.BreakJointsOnDeath = false;
		this.humanoid.SetStateEnabled(
			Enum.HumanoidStateType.FallingDown,
			false,
		);
		this.humanoid.SetStateEnabled(Enum.HumanoidStateType.Ragdoll, false);
	}

	protected changeHumanoidState(ragdolled: boolean) {
		this.humanoid.ChangeState(
			ragdolled
				? Enum.HumanoidStateType.Physics
				: Enum.HumanoidStateType.GettingUp,
		);
	}
}
