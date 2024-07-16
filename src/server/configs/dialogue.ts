import { Dialogue } from "server/components/dialogue";

export interface DialogueConfig {
	speech: string;
	options: Array<DialogueOptionConfig>;
}

interface DialogueOptionConfig {
	label: string;
	onClick: (component: Dialogue, player: Player) => void;
}

export const DIALOGUE: {
	[speaker: string]: { [topic: string]: DialogueConfig };
} = {
	WipeBook: {
		Open: {
			speech: "keep yourself safe?",
			options: [
				{
					label: "Kill me.",
					onClick: (component: Dialogue, player: Player) => {
						component.speak(player, "Confirm");
					},
				},
				{
					label: "Bye.",
					onClick: (component: Dialogue, player: Player) => {
						component.close(player);
					},
				},
			],
		},
		Confirm: {
			speech: "are you sure?",
			options: [
				{
					label: "K̶̪͚͍̱͚̳͔̤̪̦͋̂̓̊̈͊̈́̂̌͑̕̕͜͝I̸̛͈̬͍̼̐̿͗͗̚͝L̷̡̡̬͍̺͈͕͚̻̰̯̦̙̇̌̋̇̑́͑͑͗̏͊̋͜L̷͈̹̻͔͔̹̝̣̖̗̑̏̈̃͒̔̈́̒̉̉̾̏̕͘͜ͅ ̶̛̩̠̇̽͗̓͋̈́̀͋̎̾͘͠M̷̧̧̧͈̲̼̞̳̖̼̳̮̺͖̌̾͗̉Ę̴̢̧̗̙̹̩̳͎̫͇̰̝͓͙͊̓̏̋̽͌̆͐̚͜",
					onClick: (component: Dialogue, player: Player) => {
						component.speak(player, "Goodbye");
						task.wait(1);
						component.close(player);
					},
				},
				{
					label: "Let me think.",
					onClick: (component: Dialogue, player: Player) => {
						component.close(player);
					},
				},
			],
		},
		Goodbye: {
			speech: "good riddance!",
			options: [],
		},
	},
};
