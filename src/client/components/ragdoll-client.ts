import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractRagdoll } from "shared/components/ragdoll";

// TODO: local player exclusivity
@Component({
	tag: "Ragdoll",
	defaults: {
		isRagdolled: false,
	},
})
export class RagdollClient extends AbstractRagdoll implements OnStart {
	private animator = this.humanoid.WaitForChild("Animator") as Animator;

	public onStart(): void {
		this.configureHumanoid();

		this.onAttributeChanged("isRagdolled", (newValue) => {
			this.changeHumanoidState(newValue);
			if (!newValue) return;
			this.stopAnimations();
		});
	}

	public stopAnimations(): void {
		for (const track of this.animator.GetPlayingAnimationTracks()) {
			track.Stop(2);
		}
	}
}
