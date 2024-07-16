import { createProducer } from "@rbxts/reflex";

export interface DialogueState {
	readonly text: string;
	readonly options: Array<ImageLabel>;
}

const initialState: DialogueState = {
	text: "",
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
});
