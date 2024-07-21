import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { Dialogue } from "server/components/dialogue";
import { PlayerServer } from "server/components/player-server";
import { Plot } from "server/components/tycoon/plot";

export interface DialogueConfig {
	speech: string;
	options: Array<DialogueOptionConfig>;
}

interface DialogueOptionConfig {
	label: string;
	onClick: (dialogue: Dialogue, player: Player) => void;
}

export const DIALOGUE: {
	[speaker: string]: { [topic: string]: DialogueConfig };
} = {
	Ferryman: {
		Open: {
			speech: "keep yourself safe?",
			options: [
				{
					label: "Make it so.",
					onClick: (dialogue, player) => {
						dialogue.speak(player, "Confirm");
					},
				},
				{
					label: "Bye.",
					onClick: (dialogue, player) => dialogue.close(player),
				},
			],
		},
		Confirm: {
			speech: "Are you sure?",
			options: [
				{
					label: "Kill me.",
					onClick: (dialogue, player) => {
						dialogue.speak(player, "Goodbye");
						task.wait(1);
						dialogue.close(player);
						const components = Dependency<Components>();
						components
							.waitForComponent<PlayerServer>(player)
							.andThen((playerServer) =>
								playerServer.loadCharacter(true),
							);
					},
				},
				{
					label: "Let me think.",
					onClick: (dialogue, player) => dialogue.close(player),
				},
			],
		},
		Goodbye: {
			speech: "good riddance!",
			options: [],
		},
	},
	Dorgen: {
		Open: {
			speech: "You there! Might I interest you in this here plot of land? I hear there's plenty of potential for profit around these parts.",
			options: [
				{
					label: "Sure.",
					onClick: (dialogue, player) => {
						const plotInstance = dialogue.instance.Parent;
						if (plotInstance === undefined) {
							dialogue.close(player);
							return;
						}
						const components = Dependency<Components>();
						const plot =
							components.getComponent<Plot>(plotInstance);
						if (plot === undefined) {
							dialogue.close(player);
							return;
						}
						plot.claim(player);
						dialogue.speak(player, "Congratulate");
					},
				},
				{
					label: "No.",
					onClick: (dialogue, player) => dialogue.close(player),
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
						dialogue.close(player);
					},
				},
			],
		},
		Goodbye: {
			speech: "Maybe another time...",
			options: [],
		},
	},
};
