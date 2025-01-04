import { store } from "server/store";
import { DialogueConfig } from ".";

export = {
	Open: {
		speech: "you wish to learn the way of the warrior?",
		options: [
			{
				label: "indeed.",
				onClick: (dialogue, player) => {
					store.addSkill(player.instance, "Pommel Strike");
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
