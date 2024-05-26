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
	onStart(): void {
		this.configureHumanoid();

		this.onAttributeChanged("isRagdolled", (newValue) =>
			this.changeHumanoidState(newValue),
		);
	}
}
