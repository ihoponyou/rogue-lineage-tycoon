import { DialogueConfig } from ".";

export = {
	Open: {
		speech: "you wish to learn the way of the warrior?",
		options: [
			{
				label: "indeed.",
				onClick: (dialogue, player) => {
					error("fix me");
					// player.teach("Pommel Strike");
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
