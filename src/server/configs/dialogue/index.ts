import { Dialogue } from "server/components/dialogue";
import { PlayerServer } from "server/components/player-server";
import warriorTrainer from "./alfric";
import cu from "./cu";
import dorgen from "./dorgen";
import fabiana from "./fabiana";
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
	onClick: (dialogue: Dialogue, player: PlayerServer) => void;
}

export const DIALOGUE: {
	[speaker: string]: DialogueConfig;
} = {
	Ferryman: ferryman,
	Dorgen: dorgen,
	Alfric: warriorTrainer,
	Cu: cu,
	Fabiana: fabiana,
};
