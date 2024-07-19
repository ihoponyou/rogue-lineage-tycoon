import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { Dialogue } from "server/components/dialogue";
import { PlayerServer } from "server/components/player-server";

export interface DialogueConfig {
	speech: string;
	options: Array<DialogueOptionConfig>;
}

interface DialogueOptionConfig {
	label: string;
	onClick: (dialogue: Dialogue, player: Player) => void;
}

const closeDialogue = (dialogue: Dialogue, player: Player) => {
	dialogue.close(player);
};

export const DIALOGUE: {
	[speaker: string]: { [topic: string]: DialogueConfig };
} = {
	Ferryman: {
		Open: {
			speech: "keep yourself safe?",
			options: [
				{
					label: "Make it so.",
					onClick: (dialogue: Dialogue, player: Player) => {
						dialogue.speak(player, "Confirm");
					},
				},
				{
					label: "Bye.",
					onClick: closeDialogue,
				},
			],
		},
		Confirm: {
			speech: "Are you sure?",
			options: [
				{
					label: "Kill me.",
					onClick: (dialogue: Dialogue, player: Player) => {
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
					onClick: closeDialogue,
				},
			],
		},
		Goodbye: {
			speech: "good riddance!",
			options: [],
		},
	},
};
