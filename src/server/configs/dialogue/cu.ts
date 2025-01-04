import { store } from "server/store";
import { DialogueConfig } from ".";

export = {
	Open: {
		speech: "you wish to learn the way of the pit fighter?",
		options: [
			{
				label: "indeed.",
				onClick: (dialogue, player) => {
					store.addSkill(player.instance, "Dash Mastery");
					dialogue.close(player.instance);
				},
			},
			{
				label: "nah.",
				onClick: (dialogue, player) => {
					dialogue.close(player.instance);
				},
			},
		],
	},
	Goodbye: {
		speech: "'later brah.",
		options: [],
	},
} as DialogueConfig;
