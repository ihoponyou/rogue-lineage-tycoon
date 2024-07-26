import { Dialogue } from "server/components/dialogue";
import dorgen from "./dorgen";
import ferryman from "./ferryman";

export interface TopicConfig {
	speech: string;
	options: Array<DialogueOptionConfig>;
}

export interface DialogueConfig {
	[topic: string]: TopicConfig;
}

interface DialogueOptionConfig {
	label: string;
	onClick: (dialogue: Dialogue, player: Player) => void;
}

export const DIALOGUE: {
	[speaker: string]: DialogueConfig;
} = {
	Ferryman: ferryman,
	Dorgen: dorgen,
};
