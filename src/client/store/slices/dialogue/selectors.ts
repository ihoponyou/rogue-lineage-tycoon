import { RootState } from "client/store";

export const selectDialogueText = (state: RootState) => state.dialogue.text;
export const selectDialogueOptions = (state: RootState) =>
	state.dialogue.options;
export const selectSpeakerName = (state: RootState) =>
	state.dialogue.speakerName;
