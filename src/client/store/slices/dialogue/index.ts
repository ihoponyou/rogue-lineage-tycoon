import { createProducer } from "@rbxts/reflex";

export interface DialogueState {
	readonly text: string;
	readonly speakerName: string;
	readonly options: Array<ImageLabel>;
}

const initialState: DialogueState = {
	text: "",
	speakerName: "",
	options: [],
};

export const dialogueSlice = createProducer(initialState, {
	setDialogueText: (state, text: string) => ({
		...state,
		text: text,
	}),

	setDialogueOptions: (state, options: Array<ImageLabel>) => ({
		...state,
		options: options,
	}),

	setSpeakerName: (state, name: string) => ({
		...state,
		speakerName: name,
	}),
});
