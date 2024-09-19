import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { PlayerServer } from "server/components/player-server";
import { DialogueConfig } from ".";

export = {
	Open: {
		speech: "keep yourself safe?",
		options: [
			{
				label: "Make it so.",
				onClick: (dialogue, player) => {
					dialogue.speak(player.instance, "Confirm");
				},
			},
			{
				label: "Bye.",
				onClick: (dialogue, player) => dialogue.close(player.instance),
			},
		],
	},
	Confirm: {
		speech: "Are you sure?",
		options: [
			{
				label: "Kill me.",
				onClick: (dialogue, player) => {
					dialogue.speak(player.instance, "Goodbye");
					task.wait(1);
					dialogue.close(player.instance);
					const components = Dependency<Components>();
					components
						.waitForComponent<PlayerServer>(player.instance)
						.andThen((playerServer) =>
							playerServer.loadCharacter(true),
						);
				},
			},
			{
				label: "Let me think.",
				onClick: (dialogue, player) => dialogue.close(player.instance),
			},
		],
	},
	Goodbye: {
		speech: "good riddance!",
		options: [],
	},
} as DialogueConfig;
