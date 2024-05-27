import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Ragdoll } from "shared/modules/components/ragdoll";

@Component({
	tag: "Ragdoll",
	defaults: {
		isRagdolled: false,
	},
})
export class RagdollClient extends Ragdoll implements OnStart {
	private animator = this.humanoid.WaitForChild("Animator") as Animator;

	onStart(): void {
		this.configureHumanoid();

		this.onAttributeChanged("isRagdolled", (newValue) => {
			this.changeHumanoidState(newValue);
			if (!newValue) return;
			this.stopAnimations();
		});
	}

	stopAnimations(): void {
		for (const track of this.animator.GetPlayingAnimationTracks()) {
			track.Stop();
		}
	}
}
