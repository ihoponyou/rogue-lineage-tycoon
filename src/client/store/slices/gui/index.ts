import { createProducer } from "@rbxts/reflex";

export interface GuiState {
	readonly dialogue: string;
}

const initialState: GuiState = {
	dialogue: "",
};

export const guiSlice = createProducer(initialState, {
	setDialogue: (state, dialogue: string) => ({
		...state,
		dialogue: dialogue,
	}),
});
