import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { Plot } from "server/components/tycoon/plot";
import { DialogueConfig } from ".";

export = {
	Open: {
		speech: "You there! Might I interest you in this here plot of land? I hear there's plenty of potential for profit around these parts.",
		options: [
			{
				label: "Sure.",
				onClick: (dialogue, player) => {
					const plotInstance = dialogue.instance.Parent;
					if (plotInstance === undefined) {
						dialogue.close(player.instance);
						return;
					}
					const components = Dependency<Components>();
					const plot = components.getComponent<Plot>(plotInstance);
					if (plot === undefined) {
						dialogue.close(player.instance);
						return;
					}
					plot.claim(player.instance);
					dialogue.speak(player.instance, "Congratulate");
				},
			},
			{
				label: "No.",
				onClick: (dialogue, player) => dialogue.close(player.instance),
			},
		],
	},
	Congratulate: {
		speech: "Good... good! It's all yours!",
		options: [
			{
				label: "Thanks?",
				onClick: (dialogue, player) => {
					const dorgenModel = dialogue.instance as Model;
					dorgenModel.PivotTo(
						dorgenModel.GetPivot().sub(Vector3.yAxis.mul(50)),
					);
					dialogue.close(player.instance);
				},
			},
		],
	},
	Goodbye: {
		speech: "Maybe another time...",
		options: [],
	},
} as DialogueConfig;
